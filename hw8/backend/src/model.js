"use strict";
// this is model.js 
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

require('./db.js')

var commentSchema = new mongoose.Schema({
	commentId: Number, author: String, date: Date, text: String
})
var articleSchema = new mongoose.Schema({
	author: String, img: String, date: Date, text: String,
	comments: [ commentSchema ]
})
var userSchema = new mongoose.Schema({
	username: String, salt: String, hash: String, auth: {}
})

var profileSchema = new mongoose.Schema({
	username: String, headline: String, avatar: String, zipcode: String, dob: String, 
	email: String, following: [String]
})
exports.Article = mongoose.model('article', articleSchema)
exports.User = mongoose.model('user', userSchema)
exports.Profile = mongoose.model('profile', profileSchema)
exports.Comment = mongoose.model('comment', commentSchema)

