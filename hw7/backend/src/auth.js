"use strict";
const User = require('./model.js').User
const Profile = require('./model.js').Profile
const redis = require('redis').createClient("redis://h:p5q732uj3cnmt73ihj9848vcipe@ec2-23-23-247-182.compute-1.amazonaws.com:10789")
const md5 = require('md5')
const pepper = md5('This is my secret pepper')

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
			hash: hash
		}
		new User(newUser).save()

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
	const sid = req.cookies[cookieKey]
	if (sid){
		redis.del(sid)
	}
	res.clearCookie(cookieKey)
	res.send('successfully logout')
}

const isLoggedIn = (req, res, next) => {
	console.log('in isLoggedIn()...')
	var sid = req.cookies[cookieKey]
	redis.hgetall(sid, function(err, userObj) {
		if (userObj && userObj.username) {
			req.username = userObj.username
			next()
		} else {
			res.status(401).send('isLoggedIn() error')
		}
	})
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
// var request = require('request')
// var qs = require('querystring')
// var express = require('express')
// var cookieParser = require('cookie-parser')
// var session = require('express-session')
// var passport = require('passport')
// var FacebookStrategy = require('passport-facebook').Strategy;
// const config = { 
// 	clientSecret: '0ed7ea0892bb42bfa48094a96b7b5a1e', 
// 	clientID: '196939974094911', 
// 	callbackURL: 'http://localhost:3000/callback' }
// var users = {}
// passport.serializeUser(function(user, done) {
//     users[user.id] = user
//     done(null, user.id)
// })
// passport.deserializeUser(function(id, done) {
//     var user = users[id]
//     done(null, user)
// })
// passport.use(new FacebookStrategy(config,
//     function(token, refreshToken, profile, done) {
//         process.nextTick(function() {
//             return done(null, profile)
//         })
//     })
// )
// const fail = (req, res) => {
// 	res.send('fail')
// }

// const hello = (req, res) => {
// 	res.send('hello world from Jing!')
// }


module.exports = {
	setup: app => {
		// facebook login
		// app.use(session({secret: 'asdf'}));
		// app.use(passport.initialize());
		// app.use(passport.session());
		// app.use('/login/facebook', passport.authenticate('facebook', { scope: 'email' }))
		// app.use('/callback', passport.authenticate('facebook', {
		// 	successRedirect: '/hello', failureRedirect: '/fail'
		// }))
		// app.use('/hello', hello)
		// app.use('/fail', fail)
		
		// general login
		app.post('/login', login)
		app.put('/logout', isLoggedIn, logout)
		app.post('/register', register)
		app.put('/password', isLoggedIn, changePwd)
	},
	isLoggedIn: isLoggedIn
}