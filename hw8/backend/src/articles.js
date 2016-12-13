"use strict";

const Article = require('./model.js').Article
const Profile = require('./model.js').Profile
const User = require(('./model.js')).User
const isLoggedIn = require('./auth.js').isLoggedIn
const md5 = require('md5')
const uploadImage = require('./uploadCloudinary').uploadImage


function getArticles(req, res) {
	const id = req.params.id 
	if (id) {
		// search user pool
		Profile.findOne({username: id}).exec(function(err, profile) {
			if (err) {
				res.status(400).send(err)
				return
			}
			if (profile) {
				// fetch the articles authors by the user
				Article.find({author: profile.username}).exec(function(err, articles) {
					if (err) {
						res.status(400).send(err)
						return
					}
					res.send({articles: articles})
				})
			} else {
				// search the article pool
				Article.findById(id).exec(function(err, articles) {
					if (err) {
						res.status(400).send(err)
						return
					}
					res.send({articles: articles})
				})
			}
		})
	} else {
		// fetch articles authors by the requested user and his following
		const requester = req.username
		Profile.findOne({username: requester}).exec(function(err, profile) {
			const usersToQuery = [requester, ...profile.following]
			Article.find({author: {$in : usersToQuery}}).exec(function(err, articles) {
				if (err) {
					res.status(400).send(err)
					return
				}
				res.send({articles: articles})
			})
		})
	}

}

function putArticles(req, res) {
	if (!req.body.text) {
		res.status(400).send({error: 'No supplied text'})
	}
	const id = req.params.id 
	const commentId = req.body.commentId
	console.log("commentId", commentId)

	if (!commentId) {
		// update article 
		console.log('updating articles')
		Article.findOneAndUpdate({_id: id, author: req.username}, 
			{text: req.body.text},
			{new: true}).exec(function(err, article) {
			if (err) {
				res.status(400).send({error: err})
				return
			}
			if (!article) {
				res.status(400).send({error: 'Failed to fetch the article'})
				return
			}
			res.send({articles: [article]})
		})
	} else if (commentId === -1) {
		// add comment
		console.log('adding comment')
		Article.findById(id).exec(function(err, article){
			if (err) {
				res.status(400).send({error: err})
				return
			}
			if (!article) {
				res.status(400).send({error: 'No such article'})
				return
			}
			const newComment = {
				author: req.username,
				date: new Date(),
				text: req.body.text,
				commentId: article.comments.length + 1
			}
			Article.findOneAndUpdate({_id: id}, 
				{$push: {comments: newComment}},
				{new: true}).exec(function(err, article) {
					if (err) {
						res.status(400).send({error: err})
						return
					}
					res.send({articles: [article]})
			})
		})
	} else {
		Article.findOneAndUpdate({_id: id, "comments.commentId": commentId, "comments.author": req.username},
			{$set: {"comments.$.text": req.body.text}}, {new:true})
			.exec(function(err, article){
				if(!article){
					res.status(400).send("Failed to edit comment")
					return
				}
				res.send({articles: [article]})
				return
			})
	}
}

const updateArticleWithOrWithoutImage = (req, res, next) => {
	if (req.file) {
		console.log('with image')
		next()
	} else {
		console.log(req.body)
		console.log('without image')
		next()
	}
}

function postArticle(req, res) {
	console.log('inside postArticle()', req.body)

	if (!req.body.text) {
		res.status(400).send('no supplied article!')
		return
	} 
	const newArticle = {
			author:req.username,
			text:req.body.text,
			date: new Date(),
			img: null,
			comments:[]
	}
	if (req.fileurl) {
		console.log('with image')
		newArticle.img = req.fileurl
	}
	new Article(newArticle).save((err, article) => {
		if (err) {
			console.log('error in post article')
			res.status(400).send({error: err})
		} else {
			res.send({articles: [article]})
		}
	})
}

module.exports = app => {
	app.get('/articles/:id*?', getArticles)
	app.put('/articles/:id', putArticles)
	app.post('/article/', uploadImage('image'), postArticle)
}