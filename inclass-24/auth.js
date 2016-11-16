"use strict";


var redis = require('redis').createClient("redis://h:p5q732uj3cnmt73ihj9848vcipe@ec2-23-23-247-182.compute-1.amazonaws.com:10789")
var request = require('request')
var qs = require('querystring')
var express = require('express')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;
var cookieParser = require('cookie-parser')
const md5 = require('md5')


var pepper = md5('This is my secret pepper')

const saltGenerator = (username) => {
	return Math.floor(Math.random() * 10000000000) + username
}

// to serve as DB for in-class exercise
var inmemoryDB = {
	'jg37test': {
		"username": "jg37test",
		"salt": "6897698697jg37test",
		"hash": "f11d3aa594f8dd988ccff1f3da4937f8"
	}
}


function register(req, res) {
	var username = req.body.username
	var password = req.body.password
	if (!username || !password) {
		res.sendStatus(400)
		return
	}
	var salt = saltGenerator(username)
	var store = {
		username: username,
		salt: salt,
		hash: md5(password + salt + pepper)
	}
	inmemoryDB[username] = store
	var msg = {username: username, status: 'success'}
	res.send(msg)
}

var cookieKey = 'sid'
function login(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	if (!username || !password) {
		res.sendStatus(400)
		return
	}
	var store = inmemoryDB[username]
	if (!store) {
		res.sendStatus(401)
		return 
	}
	var salt = store.salt
	var hash = store.hash
	if (md5(password + salt + pepper) !== hash){
		res.sendStatus(401)
		return 
	}

	var cookieSID = md5(username)
	redis.hmset(cookieSID, {username})
	res.cookie(cookieKey, cookieSID, {maxAge: 3600*1000, httpOnly: true})
	var msg = {username: username, result: 'success'}
	res.send(msg)
}


const logout = (req, res) => {
	var sid = req.cookies[cookieKey]
	redis.del(sid)
	res.clearCookie(cookieKey)
	res.send('successfully logout')
}

const isLoggedIn = (req, res, next) => {
	console.log(req.username)
	console.log(req.cookies)
	var sid = req.cookies[cookieKey]
	redis.hgetall(sid, function(err, userObj) {
		console.log(sid + 'mapped to ' + userObj.username)
		if (userObj.username) {
			next()
		} else {
			res.sendStatus(401)
		}
	})
}



const fail = (req, res) => {
	res.send('fail')
}

const hello = (req, res) => {
	res.send('hello world from Jing!')
}

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
        process.nextTick(function() {
            return done(null, profile)
        })
    })
)

module.exports = app => {
	// facebook login
	app.use(session({secret: 'asdf'}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use('/login/facebook', passport.authenticate('facebook', { scope: 'email' }))
	app.use('/callback', passport.authenticate('facebook', {
		successRedirect: '/hello', failureRedirect: '/fail'
	}))
	app.use('/hello', hello)
	app.use('/fail', fail)
	
	// general login
	app.use(cookieParser())
	app.post('/login', login)
	app.put('/logout', isLoggedIn, logout)
	app.post('/register', register)
}