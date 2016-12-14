"use strict";
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

let url = (endpoint) => `http://localhost:3000/${endpoint}`

describe('Validate update headline', () => {

	it('should update headline', (done) => {

		let prevHeadline

		fetch(url('headlines'), {
			method: 'GET',
			credentials: 'include',
			headers: {'Content-Type': 'application/json'}
		})
		.then(response => {
			expect(response.status).to.eql(200)
			return response.json()
		})
		.then(body => {
			return fetch(url('headline'), {
				method: 'PUT',
				credentials: 'include',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					headline: 'new headline'
				})
			})
		})
		.then(response => {
			expect(response.status).to.eql(200)
			return response.json()
		})
		.then(body => {
			expect(body.headline).to.eql('new headline')
		})
		.then(done)
	})
})