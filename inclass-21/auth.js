var cookieParser = require('cookie-parser')
const md5 = require('md5')

var pepper = md5('This is my secret pepper')

const saltGenerator = (username) => {
	return Math.floor(Math.random() * 10000000000) + username
}

// to serve as DB for in-class exercise
var inmemoryDB = {}

// map sessionID to user
var sessionUsers = {}

function register(req, res) {
	var username = req.body.username
	var password = req.body.password
	if (!username || !password) {
		res.sendStatus(400)
		return
	}
	var salt = saltGenerator(username)
	var store = {
		username: username,
		salt: salt,
		hash: md5(password + salt + pepper)
	}
	inmemoryDB[username] = store
	var msg = {username: username, status: 'success'}
	res.send(msg)
}

const generateCode = () => {
	return '123'
}


var cookieKey = 'sid'
function login(req, res) {
	//console.log('in login, inmemoryDB is', inmemoryDB)
	var username = req.body.username;
	var password = req.body.password;
	if (!username || !password) {
		res.sendStatus(400)
		return
	}
	var store = inmemoryDB[username]
	if (!store) {
		res.sendStatus(401)
		return 
	}
	var salt = store.salt
	var hash = store.hash
	if (md5(password + salt + pepper) !== hash){
		res.sendStatus(401)
		return 
	}

	res.cookie(cookieKey, generateCode(), 
		{maxAge: 3600*1000, httpOnly: true})
	sessionUsers['123'] = username
	var msg = {username: username, result: 'success'}
	res.send(msg)
}


module.exports = app => {
	app.use(cookieParser())
	app.post('/login', login)
	app.post('/register', register)
}