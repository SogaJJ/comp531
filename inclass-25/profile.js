"use strict";

let profile = {
	headline: 'This is my headline!',
	email: 'test@foo.com',
	zipcode: 12345,
	dob: '11-11-1111',
	avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg'
}

const index = (req, res) => {
     res.status(200).send({ hello: 'world' })
}

const getHeadlines = (req, res) => {
	const users = req.params.users ? req.params.users.split(',') : ['jg37test']
	const requested = users.map(user => {
		if (user == 'jg37test') {
			return {username: 'jg37test', headline: profile.headline}
		} else {
			return {username: user, headline: 'dummy headline'}
		}
	})
	res.status(200).send({ headlines: requested})
}

const putHeadline = (req, res) => {
	let headline = req.body.headline
	if (!headline) {
		res.status(400).send('no supplied headline!')
	} else {
		profile.headline = headline
		res.status(200).send({
			username: 'jg37test',
			headline: profile.headline
		})
	}
	
}

const getEmail = (req, res) => {
	let user = req.params.user ? req.params.user : 'jg37test'	
	let payload
	if (user == 'jg37test') {
		payload = profile.email
	} else {
		payload = 'dummy email'
	}
	res.status(200).send({
		username: user,
		email: payload
	})
}

const putEmail = (req, res) => {
	if (!req.body.email) {
		res.status(400).send('no supplied email!')
	} else {
		profile.email = req.body.email
		res.status(200).send({
			username: 'jg37test',
			email: profile.email
		})
	}
	
}

const getZipcode = (req, res) => {
	let user = req.params.user ? req.params.user : 'jg37test'	
	let payload
	if (user == 'jg37test') {
		payload = profile.zipcode
	} else {
		payload = 'dummy zipcode'
	}
	res.status(200).send({
		username: user,
		email: payload
	})
}

const putZipcode = (req, res) => {
	if (!req.body.zipcode) {
		res.status(400).send('no supplied zipcode!')
	} else {
		profile.zipcode = req.body.zipcode
		res.status(200).send({
			username: 'jg37test',
			zipcode: profile.zipcode
		})
	}
}

const getAvatars = (req, res) => {
	let user = req.params.user ? req.params.user : 'jg37test'
	if (user == 'jg37test') {
		res.status(200).send({ avatars: [{
				username: user,
				avatar: profile.avatar
			}]})
	} else {
		res.status(200).send({ avatars: [{
				username: user,
				avatar: 'dummy avatar'
			}]})		
	}
	
}

const putAvatar = (req, res) => {
	if (!req.body.avatar) {
		res.status(400).send('no supplied avatar')
	} else {
		profile.avatar = req.body.avatar
		res.status(200).send({
			username: 'jg37test',
			avatar: profile.avatar	
		})
	}
}

const getDOB = (req, res) => {
	res.status(200).send({
		username: 'jg37test',
		dob: profile.dob
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
	app.get('/', index)
	app.put('/headline', putHeadline)
	app.get('/headlines/:users*?', getHeadlines)

	app.get('/email/:user?',getEmail)
	app.put('/email',putEmail)

	app.get('/zipcode/:user?',getZipcode)
	app.put('/zipcode',putZipcode)

	app.get('/avatars/:user?',getAvatars)
	app.put('/avatar', uploadImage('avatar'), putAvatar2)
}
