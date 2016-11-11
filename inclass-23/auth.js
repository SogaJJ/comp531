"use strict";


var request = require('request')
var qs = require('querystring')
var express = require('express')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;


const clientSecret = '0ed7ea0892bb42bfa48094a96b7b5a1e'
const clientID = '196939974094911'
const callbackURL = 'http://localhost:3000/auth/callback'
const config = { clientSecret, clientID, callbackURL }

passport.serializeUser(function(user, done) {
	var user = users[id]
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






var cookieParser = require('cookie-parser')
const md5 = require('md5')

var pepper = md5('This is my secret pepper')

const saltGenerator = (username) => {
	return Math.floor(Math.random() * 10000000000) + username
}

// to serve as DB for in-class exercise
var inmemoryDB = {}

// map sessionID to user
var sessionUsers = {}

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

const generateCode = () => {
	return '123'
}


var cookieKey = 'sid'
function login(req, res) {
	//console.log('in login, inmemoryDB is', inmemoryDB)
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

	res.cookie(cookieKey, generateCode(), 
		{maxAge: 3600*1000, httpOnly: true})
	sessionUsers['123'] = username
	var msg = {username: username, result: 'success'}
	res.send(msg)
}

// function logout(req, res) {
// 	res.status(200).send('success logout')
// }

function password(req, res) {
	res.status(200).send({
		username: 'jg37test',
		status: 'will not change'
	})
}

function stubLogin(req, res){
	res.status(200).send({
		username: 'jg37test',
		status: 'success'
	})
}

function stubLogout(req, res){
	res.status(200).send({
		username: 'jg37test',
		status: 'success'
	})
}

function stubRegister(req, res){
	res.status(200).send({
		username: 'jg37test',
		status: 'success'
	})
}


const logout = (req, res) => {
	req.logout()
	res.redirect('/login')
}

const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		next()
	} else {
		res.redirect('/login')
	}
}

const profile = (req, res) => {
	res.send('ok now what?', req.user)
}


const fail = (req, res) => {
	res.send('fail')
}

const hello = (req, res) => {
	res.send('hello world')
}

module.exports = app => {
	app.use(session({secret: 'asdf'}));
	app.use(passport.initialize());
	app.use(passport.session());
	
	app.use('/login', passport.authenticate('facebook', { scope: 'email' }))
	app.use('/callback', passport.authenticate('facebook', {
		successRedirect: '/profile', failureRedirect: '/fail'
	}))
	app.use('/profile', isLoggedIn, profile)
	app.use('/fail', fail)
	app.use('/logout', logout)
	app.use('/', hello)


	app.use(cookieParser())
	// app.post('/login', stubLogin)
	// app.post('/register', stubRegister)
	// app.put('/logout', stubLogout)
	// app.put('/password', password)
}