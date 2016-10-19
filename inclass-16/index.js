
const express = require('express')
const bodyParser = require('body-parser')

let articles = [
				{id: 1, author: "author1", text: "this is the first article"},
				{id: 2, author: "author2", text: "this is the second article"},
				{id: 3, author: "author3", text: "this is the third article"}
				]


const addArticle = (req, res) => {
     console.log('Payload received', req.body)   
     var newArticle = {id: articles.length + 1, author: "Jing Guo", text: req.body.body} 
     articles.push(newArticle)
     res.send(newArticle)
}

const getArticles = (req, res) => res.send({articles: articles})

const hello = (req, res) => res.send({ hello: 'world' })

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/', hello)
app.get('/articles', getArticles)


// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})