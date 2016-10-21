
const index = (req, res) => {
     res.send({ hello: 'world' })
}

const getHeadlines = (req, res) => {
	res.send({ headlines: [{
			username: req.params.user || 'jg37',
			headline: 'my headline'
		}]})
}

const putHeadline = (req, res) => {
	res.send({
			username: 'jg37',
			headline: req.body.headline || 'you did not supply it'
		})
}

const getEmail = (req, res) => {
	res.send({
		username: req.params.user || 'jg37',
		email: 'jg37@rice.edu'
	})
}

const putEmail = (req, res) => {
	res.send({
		username: 'jg37',
		email: req.body.email || 'you did not supply it'
	})
}

const getZipcode = (req, res) => {
	res.send({
		username: req.params.user || 'jg37',
		zipcode: '77005'
	})
}

const putZipcode = (req, res) => {
	res.send({
		username: 'jg37',
		zipcode: req.body.zipcode || 'you did not supply it'		
	})
}

const getAvatars = (req, res) => {
	res.send({ avatars: [{
			username: req.params.user || 'jg37',
			avatar: 'my avatar'
		}]})
}

const putAvatar = (req, res) => {
	res.send({
		username: 'jg37',
		avatar: req.body.avatar || 'you did not supply it'	
	})
}

module.exports = app => {
	app.get('/', index)
	app.put('/headline', putHeadline)
	app.get('/headlines/:user?', getHeadlines)
	app.get('/email/:user?',getEmail)
	app.put('/email',putEmail)
	app.get('/zipcode/:user?',getZipcode)
	app.put('/zipcode',putZipcode)
	app.get('/avatars/:user?',getAvatars)
	app.put('/avatar',putAvatar)
}
