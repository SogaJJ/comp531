
let in_memory_articles = [
	{
		id:1,
		author:'jg37test',
		text:'This is the first article of jg37test',
		data: new Date(),
		comments:[]
	},
	{
		id:2,
		author:'jg37test',
		text:'This is the second article of jg37test',
		data: new Date(),
		comments:[]
	},
	{
		id:3,
		author:'jg37',
		text:'This is the first article of jg37',
		data: new Date(),
		comments:[]
	}	
]


function getArticles(req, res) {
	if (req.params.id) {
		let requested = in_memory_articles.filter(article => {
			return article.id == req.params.id
		})
		res.status(200).send({articles: requested})
	} else {
		res.status(200).send({articles: in_memory_articles})
	}
}

function putArticles(req, res) {
	let requested = in_memory_articles.filter(article => {
		if (article.id == req.params.id) {
			article.text = req.body.text
		}
		return article.id == req.params.id
	})
	if (requested.length == 0) {
		res.status(400).send('no such article')
	} else {
		in_memory_articles.filter
		res.status(200).send({articles:requested[0]})
	}
}

function postArticle(req, res) {
	if (!req.body.text) {
		res.status(400).send('no supplied article!')
	} else {
		let newArticle = {
			id:11,
			author:'jg37test',
			text:req.body.text,
			data: new Date(),
			comments:[]
		}
		in_memory_articles.push(newArticle)
		res.status(200).send({articles: [newArticle]})
	}
	
	
}

module.exports = app => {
	app.get('/articles/:id*?', getArticles)
	app.put('/articles/:id', putArticles)
	app.post('/article/', postArticle)
}