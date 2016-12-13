"use strict";
const User = require('./model.js').User
const Profile = require('./model.js').Profile
const Article = require('./model.js').Article
const Comment = require('./model.js').Comment
const redis = require('redis').createClient("redis://h:p05846183c60c08331bee5dfd37c0428dfdcf63f0b5fe9494c70f6bb6bfa00cad@ec2-54-83-62-222.compute-1.amazonaws.com:9929")
const md5 = require('md5')
const pepper = md5('This is my secret pepper')
const Promise = require('bluebird')

const saltGenerator = (username) => {
	return Math.floor(Math.random() * 10000000000) + username + new Date().getTime()
}

function findByUser(username, callback) {
	User.find({username}).exec(function(error, items) {
		console.log('There are' + items.length + 'entries for ' + username, items[0])
		callback(items)
	})
}

const register = (req, res) => {
	console.log('invoking register()', req.body)
	const username = req.body.username
	const password = req.body.password
	const dob = req.body.dob
	const zipcode = req.body.zipcode
	const email = req.body.email

	console.log('In register', zipcode)

	if (!username || !password) {
		res.sendStatus(400)
		return
	}
	findByUser(username, function(items){
		if (items.length !== 0) {
			res.status(401).send({username: username, status: 'User registered already!'})
			return
		}
		// create the new user
		const salt = saltGenerator(username)
		const hash = md5(password + salt + pepper)
		const newUser = {
			username: username,
			salt: salt,
			hash: hash,
			auth: {local: username}
		}
		new User(newUser).save()
		console.log('register new user', newUser)

		// create a new profile for the user
		const newProfile = {
			username: username, 
			headline: 'default headline', 
			avatar: "http://kids.nationalgeographic.com/content/dam/kids/photos/animals/Fish/A-G/clown-anemonefish-tentacles.jpg", 
			zipcode: zipcode, 
			dob: dob, 
			email: email, 
			following: []
		}
		new Profile(newProfile).save()

		// send response
		res.status(200).send({username: username, status: 'success'})
	})
}

const cookieKey = 'sid'
const login = (req, res) => {
	var username = req.body.username;
	var password = req.body.password;
	if (!username || !password) {
		res.sendStatus(400).send({status: 'failed, no username and password supplied', })
		return
	}
	findByUser(username, function(items) {
		if (items.length === 0) {
			res.status(401).send('No such user found!')
			return
		}
		const userObj = items[0]
		const hash = md5(password + userObj.salt + pepper)
		if (hash !== userObj.hash) {
			res.status(401).send('Wrong password supplied')
			return
		}
		const sessionKey = md5('My secret message' + new Date().getTime() + username)
		redis.hmset(sessionKey, {username: username})
		res.cookie(cookieKey, sessionKey, {maxAge:3600*1000, httpOnly:true})
		res.status(200).send({
			username: username,
			status: 'success'
		})
	})
}


const logout = (req, res) => {
	if (req.isAuthenticated()) {
		console.log('logout Oauth')
		req.logout()
	}
	const sid = req.cookies[cookieKey]
	if (sid){
		redis.del(sid)
	}
	res.clearCookie(cookieKey)
	res.send('successfully logout')
}

const isLoggedIn = (req, res, next) => {
	console.log('in isLoggedIn()...')
	if (req.isAuthenticated()) {
		console.log('req.isAuthenticated() is true')
		const usernameFB = req.user.displayName + '@facebook'		
		User.findOne({"auth.facebook": usernameFB}).exec(function(err, user) {
			if (err) {
				req.status(400).send(err)
			} else {
				if (user) {
					req.username = user.username
					console.log('req.username:', req.username)
					next()
				} else {
					res.status(400).send('error find facebook auth')
				}
			}
		})
	} else {
		console.log('req.isAuthenticated() is false')
		var sid = req.cookies[cookieKey]
		redis.hgetall(sid, function(err, userObj) {
			if (userObj && userObj.username) {
				req.username = userObj.username
				console.log('req.username:', req.username)
				next()
			} else {
				console.log('in isLoggedIn()...unauthorized')
				res.status(401)
			}
		})		
	}





	// if (req.isAuthenticated()) {
	// 	console.log('req.isAuthenticated() is true')
	// 	req.username = req.user.displayName + '@facebook'
	// 	next()
	// } else {
	// 	console.log('req.isAuthenticated() is false')
	// 	var sid = req.cookies[cookieKey]
	// 	redis.hgetall(sid, function(err, userObj) {
	// 		if (userObj && userObj.username) {
	// 			req.username = userObj.username
	// 			next()
	// 		} else {
	// 			console.log('in isLoggedIn()...unauthorized')
	// 			res.status(401)
	// 		}
	// 	})		
	// }
}

const changePwd = (req, res) => {
	console.log('in changePwd()...')
	const username = req.username
	const password = req.body.password

	console.log('username: ', username, '. password: ', password)
	const salt = saltGenerator(username)
	const hash = md5(password + salt + pepper)
	const newUser = {
		username: username,
		salt: salt,
		hash: hash
	}	
	User.findOneAndUpdate({username}, newUser, function(err, items) {
		if (err || !items) {
			res.status(400).send('error during changing password')
			return
		}
		const sessionKey = md5('My secret message' + new Date().getTime() + username)
		redis.hmset(sessionKey, {username: username})
		res.cookie(cookieKey, sessionKey, {maxAge:3600*1000, httpOnly:true})
		res.status(200).send({
			username: username,
			status: 'change password success'
		})
	})
}

// Facebook Oauth
var request = require('request')
var qs = require('querystring')
var express = require('express')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;
const config = { 
	clientSecret: '0ed7ea0892bb42bfa48094a96b7b5a1e', 
	clientID: '196939974094911', 
	callbackURL: 'http://localhost:3000/callback' }
var users = {}
passport.serializeUser(function(user, done) {
    users[user.id] = user
    done(null, user.id)
})
passport.deserializeUser(function(id, done) {
    var user = users[id]
    done(null, user)
})
passport.use(new FacebookStrategy(config,
    function(token, refreshToken, profile, done) {
    	//console.log('testing point', profile)
        process.nextTick(function() {
            return done(null, profile)
        })
    })
)
const fail = (req, res) => {
	res.send('fail')
}

const facebookAction = (req, res) => {
	console.log('backend: in facebookAction ... ')
	const usernameFB = req.user.displayName + '@facebook'
	let usernameLocal

	// check whether there is a locally logged in user
	var sid = req.cookies[cookieKey]
	redis.hgetall(sid, function(err, userObj) {
		if (userObj && userObj.username) {
			usernameLocal = userObj.username
		}
	})				

	// check whethere this facebook account has record
	User.find({"auth.facebook": usernameFB}).exec(function(err, user) {
		if (user.length === 0) {
			// no facebook record
			console.log('no facebook record found')
			if (usernameLocal) {
				// add facebook auth to the current logged in user
				console.log('has a local logged in, add facebook auth to the current logged in user')
				User.findOne({username: usernameLocal}).exec(function(err, user) {
					user.auth.facebook = usernameFB
					console.log('added facebook profile to existing profile', user)
				})
			} else {
				// create new facebook User and Profile
				console.log('no local logged in')
				console.log('creating fb user, profile in database ...')
				new User({
					username: usernameFB,
					salt: null,
					hash: null,
					auth: {facebook: usernameFB}
				}).save()
				// create a default new Profile
				new Profile({
					username: usernameFB, 
					headline: 'default facebook headline', 
					avatar: "https://www.facebook.com/images/fb_icon_325x325.png",
					dob: "00/00/0000", 
					email: "default@facebook.com", 
					following: []
				}).save()
			}
			console.log('redirecting to', req.headers.referer)
			res.redirect(req.headers.referer)			
		} else {
			// has facebook record
			console.log('facebook record found')
			if (usernameLocal) {
				// locally logged in user try to link
				console.log('has a local logged in')
				mergeAccount(req, res, usernameLocal, usernameFB, 'local', function(){
					console.log('redirecting to', req.headers.referer)
					res.redirect(req.headers.referer)
				})
			} else {
				// no locally logged in user, just use fb to login, do nothing
				console.log('no local logged in')
				console.log('redirecting to', req.headers.referer)
				res.redirect(req.headers.referer)
			}	
		}
	})	
}

const linkToLocal = (req, res) => {
	console.log('backend: in linkToLocal...')
	const usernameFB = req.username
	console.log('usernameFB',usernameFB)
	const usernameLocal = req.body.username
	const usernamePassword = req.body.password
	console.log('usernameLocal',usernameLocal)
	findByUser(usernameLocal, function(items) {
		if (items.length === 0) {
			res.status(400).send('No such user found!')
			return
		}
		const userObj = items[0]
		const hash = md5(usernamePassword + userObj.salt + pepper)
		if (hash !== userObj.hash) {
			res.status(400).send('Wrong password supplied')
			return
		}
		// TODO merge two account
		mergeAccount(req, res, usernameLocal, usernameFB, 'facebook', function(){
			res.send('linkToLocal successfully merge two account')
		})
	})
}

const mergeAccount = (req, res, usernameLocal, usernameFB, endFrom, callback) => {
	console.log('backend: in mergeAccount ...')
	console.log('usernameLocal is ', usernameLocal)
	console.log('usernameFB is ', usernameFB)
	
	
	Profile.findOneAndUpdate({username: usernameLocal}).exec(function(err, localprofile){
		console.log('localprofile', localprofile)
		Profile.findOne({username: usernameFB}).exec(function(err, fbprofile){
			console.log('fbprofile', fbprofile)
		})
	})
	callback()
	// Profile.findOne({username: usernameFB}, function(err, FBprofile){

	// 	console.log('find fb account', FBprofile)
	// 	const followingToMerge = FBprofile.following.filter(function(f){return f !== usernameLocal})
	// 	console.log('followingToMerge', followingToMerge)

	// 	Profile.findOneAndUpdate({username: usernameLocal}, function(err, Localprofile) {
	// 		console.log('find local account', Localprofile)

	// 	}).exec()

	// }).exec().then(callback())

}

// to check whether the account is linked
const checkAccountLinked = (req, res) => {
	console.log('backend: in checkAccountLinked...')
	if (req.isAuthenticated()) {
		console.log('facebook logged in ...')
		// login with facebook, check with the FB account linked with a local account
		const usernameFB = req.user.displayName + '@facebook'
		User.findOne({"auth.facebook": usernameFB}).exec(function(err, user) {
			if (err) {
				req.status(400).send(err)
			} else {
				if (user) {
					if (user.auth.local) {
						console.log('linked with local', user)
						res.send({status: 'linked'})
					} else {
						console.log('no local account', user)
						res.send({status: 'facebook'})
					}
				} else {
					res.status(400).send('error find facebook auth')
				}
			}
		})
	} else {
		// login locally
		console.log('locally login ...', req.username)
		User.findOne({username: req.username}).exec(function(err, user) {
			if (user) {
				if (user.auth.facebook) {
					// linked facebook 
					res.send({status: 'linked'})
				} else {
					// not linked facebook
					res.send({status: 'local'})
				}
			} else {
				res.status(400)
			}
		})
	}

}


module.exports = {
	setup: app => {

		// facebook login
		app.use(session({secret: 'asdf'}));
		app.use(passport.initialize());
		app.use(passport.session());
		app.use('/login/facebook', passport.authenticate('facebook', { scope: 'email' }))
		app.use('/callback', passport.authenticate('facebook', { failureRedirect: '/fail'
		}), facebookAction)
		app.use('/fail', fail)
		
		// general login
		app.post('/login', login)
		app.put('/logout', isLoggedIn, logout)
		app.post('/register', register)
		app.put('/password', isLoggedIn, changePwd)

		// link account
		app.get('/checkAccountLinked', isLoggedIn, checkAccountLinked)
		app.post('/linkToLocal', isLoggedIn, linkToLocal)
	},
	isLoggedIn: isLoggedIn
}