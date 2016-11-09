let followings = ['user1', 'user2', 'user3']

function getFollowing(req, res) {
	let user = req.params.user ? req.params.user : 'jg37test'
	res.status(200).send({
		username: user,
		following: followings
	})
}

function putFollowing(req, res) {
	if (!req.params.user) {
		res.status(400).send('no supplied username')
	} else {
		followings.push(req.params.user)
		res.status(200).send({
			username: 'jg37test',
			following: followings
		})
	}
}

function deleteFollowing(req, res) {
	if (!req.params.user) {
		res.status(400).send('no supplied username')
	} else {
		followings = followings.filter(it => {return it != req.params.user})
		res.status(200).send({
			username: 'jg37test',
			following: followings
		})
	}
}

module.exports = app => {
	app.get('/following/:user?', getFollowing)
	app.put('/following/:user', putFollowing)
	app.delete('/following/:user', deleteFollowing)	
}