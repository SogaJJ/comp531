"use strict";

const isLoggedIn = require('./auth.js').isLoggedIn
const Profile = require('./model.js').Profile
const uploadImage = require('./uploadCloudinary').uploadImage

const getHeadlines = (req, res) => {
	console.log('backend: tring getHeadlines ...')
	const users = req.params.users ? req.params.users.split(',') : [req.username]
	console.log('[getHeadlines] users', users)
	Profile.find({username: {$in: users}}).exec(function(err, profiles) {
		console.log('[getHeadlines] profiles', profiles)
		const headlines = profiles.map(profile => {
			return {username: profile.username, headline:profile.headline}
		})
		res.send({headlines})			
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
	console.log('get avatars for ...', users)
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
	console.log("inside putAvatar()")
	const img = req.fileurl
	if (!img) {
		console.log('Mongoose update bad requeset: Profile update ' + req.username)
		return res.status(400).send({error:'Invalid avatar file url'})	
	}

	Profile.findOneAndUpdate({username: req.username}, {avatar: img},
	{new:true}, (err,user) => {
		if (err) {
			console.error('Mongoose update failed: Profile update failed since' + err)
			res.status(500).send({error:err})
		} else if (!user) {
			console.log('Mongoose update bad requeset: Profile update ' + req.username)
			res.status(400).send({error:'Can\'t update zipcode for ' + req.username})	
		} else {
			console.log('Mongoose update success: Profile update' + req.username)
			res.json({username: user.username, avatar:user.avatar})
		}
	})
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


const putAvatar2 = (req, res) => {
	console.log("req is ", req)
	res.status(200)
	// if (!req.fileurl) {
	// 	res.status(400)
	// }
	// profile.avatar = req.fileurl
	// res.send({username: 'jg37test', avatar: req.fileurl})
}


module.exports = app => {
	app.use(isLoggedIn)
	// headline
	app.put('/headline',  putHeadline)
	app.get('/headlines/:users*?', getHeadlines)
	// email
	app.get('/email/:user?', getEmail)
	app.put('/email',  putEmail)
	// zipcode
	app.get('/zipcode/:user?',  getZipcode)
	app.put('/zipcode',  putZipcode)
	// avatar
	app.get('/avatars/:users?',  getAvatars)
	app.put('/avatar', uploadImage('avatar'), putAvatar)
	// dob
	app.get('/dob', getDOB)

	// app.put('/headline', isLoggedIn,  putHeadline)
	// app.get('/headlines/:users*?', isLoggedIn, getHeadlines)

	// app.get('/email/:user?', isLoggedIn, getEmail)
	// app.put('/email', isLoggedIn,  putEmail)

	// app.get('/zipcode/:user?', isLoggedIn,  getZipcode)
	// app.put('/zipcode', isLoggedIn,  putZipcode)

	// app.get('/avatars/:users?', isLoggedIn,  getAvatars)
	// app.put('/avatar', isLoggedIn, putAvatar)

	// app.get('/dob', isLoggedIn, getDOB)
}
