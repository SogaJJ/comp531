"use strict";

const isLoggedIn = require('./auth.js').isLoggedIn
const Profile = require('./model.js').Profile



const getHeadlines = (req, res) => {
	const users = req.params.users ? req.params.users.split(',') : [req.username]
	Profile.find({username: {$in: users}}).exec(function(err, profiles) {
		if (!profiles) {
			res.status(400).send('No profile found for requested users')
			return
		}
		const foundProfiles = profiles.map(profile => {
			return {username: profile.username, headline:profile.headline}
		})
		res.send({headlines: foundProfiles})
	})
}

const putHeadline = (req, res) => {
	const headline = req.body.headline
	if (!headline) {
		res.status(400).send('no supplied headline!')
		return
	}
	Profile.findOneAndUpdate({username: req.username}, {headline: headline}, function(err, item){
		if (err || !item) {
			res.status(400).send('error in putHeadline: no such user')
			return
		}
		res.send({
			username: item.username,
			headline: headline
		})
	})	
}

const getEmail = (req, res) => {
	const user = req.params.user ? req.params.user : req.username	
	Profile.findOne({username: user}, function(err, profile) {
		if (err || !profile) {
			res.status(400).send('error in getEmail: no such user')
			return
		}
		res.send({
			username: user,
			email: profile.email
		})
	})
}

const putEmail = (req, res) => {
	if (!req.body.email) {
		res.status(400).send('no supplied email!')
		return
	}
	Profile.findOneAndUpdate({username: req.username}, {email: req.body.email}, function(err, profile) {
		if (err || !profile) {
			res.status(400).send('error in putEmail: no such profile')
			return
		}
		res.send({
			username: req.username,
			email: req.body.email
		})
	})
}

const getZipcode = (req, res) => {
	const user = req.params.user ? req.params.user : req.username	
	Profile.findOne({username: user}, function(err, profile) {
		if (err || !profile) {
			res.status(400).send('error in getZipcode: no such user')
			return
		}
		res.send({
			username: user,
			zipcode: profile.zipcode
		})
	})
}

const putZipcode = (req, res) => {
	if (!req.body.zipcode) {
		res.status(400).send('no supplied zipcode!')
		return
	}
	Profile.findOneAndUpdate({username: req.username}, {zipcode: req.body.zipcode}, function(err, profile) {
		if (err || !profile) {
			res.status(400).send('error in putZipcode: no such profile')
			return
		}
		res.send({
			username: req.username,
			zipcode: req.body.zipcode
		})
	})
}

const getAvatars = (req, res) => {
	const users = req.params.users ? req.params.users.split(',') : [req.username]
	Profile.find({username: {$in: users}}).exec(function(err, profiles) {
		if (!profiles) {
			res.status(400).send('No profile found for requested users')
			return
		}
		const foundProfiles = profiles.map(profile => {
			return {username: profile.username, avatar:profile.avatar}
		})
		res.send({avatars: foundProfiles})
	})
}

const putAvatar = (req, res) => {
	res.send('stub for now')
}

const getDOB = (req, res) => {
	const user = req.params.user ? req.params.user : req.username	
	Profile.findOne({username: user}, function(err, profile) {
		if (err || !profile) {
			res.status(400).send('error in getDOB: no such user')
			return
		}
		res.send({
			username: user,
			dob: profile.dob
		})
	})
}

const uploadImage = require('./uploadCloudinary')

const putAvatar2 = (req, res) => {
	if (!req.fileurl) {
		res.status(400)
	}
	profile.avatar = req.fileurl
	res.send({username: 'jg37test', avatar: req.fileurl})
}


module.exports = app => {
	
	app.put('/headline', isLoggedIn,  putHeadline)
	app.get('/headlines/:users*?', isLoggedIn, getHeadlines)

	app.get('/email/:user?', isLoggedIn, getEmail)
	app.put('/email', isLoggedIn,  putEmail)

	app.get('/zipcode/:user?', isLoggedIn,  getZipcode)
	app.put('/zipcode', isLoggedIn,  putZipcode)

	app.get('/avatars/:user?', isLoggedIn,  getAvatars)
	app.put('/avatar', isLoggedIn, putAvatar)

	app.get('/dob', isLoggedIn, getDOB)
}
