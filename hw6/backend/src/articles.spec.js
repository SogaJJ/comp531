const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

let url = (endpoint) => `http://localhost:3000/${endpoint}`

describe('Validate post article', () => {
	it('should post an article', (done) => {

		let prevArtileCount

		fetch(url('articles'), {
			method: 'GET',
			credentials: 'include',
			headers: {'Content-Type': 'application/json'}
		})
		.then(response => {
			expect(response.status).to.eql(200)
			return response.json()
		})
		.then(body => {
			prevArtileCount = body.articles.length
		})
		.then(_ => {
			return fetch(url('article'), {
				method: 'POST',
				credentials: 'include',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					text: 'new article'
				})
			})
		})
		.then(response => {
			expect(response.status).to.eql(200)
			return response.json()
		})
		.then(body => {
			expect(body.articles.length).to.eql(1)
			expect(body.articles[0].text).to.eql('new article')
		})
		.then(_ => {
			return fetch(url('articles'), {
				method: 'GET',
				credentials: 'include',
				headers: {'Content-Type': 'application/json'}
			})
		})
		.then(response => {
			expect(response.status).to.eql(200)
			return response.json()
		})
		.then(body => {
			expect(body.articles.length).to.eql(prevArtileCount + 1)
		})
		.then(done)



	})
})





