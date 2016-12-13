"use strict";

const Profile = require('./model.js').Profile
const isLoggedIn = require('./auth.js').isLoggedIn

function getFollowing(req, res) {
	const user = req.params.user ? req.params.user : req.username
	Profile.findOne({username: user}).exec(function(err, profile){
		if (err || !profile) {
			res.status(400).send('Error in getFollowing')
			return
		}
		res.send({
			username: user,
			following: profile.following
		})
	})
	
}

function putFollowing(req, res) {
	console.log('in putFollowing()')
	const userAdding = req.params.user
	if (!userAdding) {
		res.status(400).send('No user to be added!')
		return
	}
	Profile.findOne({username: userAdding}).exec(function(err, follower){
		console.log('follower', follower)
		console.log('err', err)
		if (!follower) {
			console.log('no such follower to add')
			res.status(400).send('no such follower to add')
			return
		}
		if (follower.username === req.username) {
			Profile.findOne({username: req.username}).exec(function(err, profile) {
				res.send({
					username: req.username,
					following: profile.following
				})
			})
		} else {
			Profile.findOneAndUpdate({username: req.username}, 
				{$addToSet: {following: follower.username}},
				{new: true}).exec(function(err, profile) {
					res.send({
						username: req.username,
						following: profile.following
					})	
				})
		}
	})
}

function deleteFollowing(req, res) {
	if (!req.params.user) {
		res.status(400).send('no supplied username')
		return
	}
	const userDeleting = req.params.user
	Profile.findOneAndUpdate({username: req.username}, 
		{$pull: {following: userDeleting}},
		{new: true}).exec(function(err, profile) {
			res.send({
				username: req.username,
				following: profile.following
			})
	})
}

module.exports = app => {
	app.get('/following/:user?', isLoggedIn, getFollowing)
	app.put('/following/:user', isLoggedIn, putFollowing)
	app.delete('/following/:user', isLoggedIn, deleteFollowing)	
}