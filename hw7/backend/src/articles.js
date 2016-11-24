"use strict";

const Article = require('./model.js').Article
const isLoggedIn = require('./auth.js').isLoggedIn
const md5 = require('md5')

function getArticles(req, res) {
	const id = req.params.id 
	if (!id) {
		// return all articles in the db
		console.log('getting all articles')
		Article.find().exec(function(err, articles){
			res.send({articles})
		})
	} else {
		Article.findById(id).exec(function(err, articles) {
			res.send({
				articles: [articles]
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
			Article.findOneAndUpdate({_id: id, author: req.username}, 
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

function postArticle(req, res) {
	if (!req.body.text) {
		res.status(400).send('no supplied article!')
		return
	} 
	const newArticle = {
			author:req.username,
			text:req.body.text,
			data: new Date(),
			img: '',
			comments:[]
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
	app.get('/articles/:id*?', isLoggedIn, getArticles)
	app.put('/articles/:id', isLoggedIn, putArticles)
	app.post('/article/', isLoggedIn, postArticle)
}