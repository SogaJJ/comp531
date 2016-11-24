const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cookieParser = require('cookie-parser')

function CORS(req, res, next) {
	res.header("Access-Control-Allow-Origin", req.headers.origin)
	res.header("Access-Control-Allow-Credentials", true)
	res.header("Access-Control-Allow-Methods", 'POST, PUT')
	res.header("Access-Control-Allow-Headers", 'Authorization, Content-Type')
	if (req.method == 'OPTIONS') {
		res.status(200).send('success')
	} else {
		next()
	}
}

app.use(bodyParser.json())
app.use(CORS)
app.use(cookieParser())
require('./src/profile')(app)
require('./src/auth').setup(app)
require('./src/articles')(app)
require('./src/following')(app)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
