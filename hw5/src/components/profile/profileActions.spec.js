import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'


describe('Validate profile actions', ()=> {
	let Action, resource, url, profileActions
	
	beforeEach(() => {
		if(mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
  		}
  		Action = require('../../actions').default
		resource = require('../../actions').default
  		url = require('../../actions').url
  		profileActions = require('./profileActions')
	})

	afterEach(() => { 
  		if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
  		}
	})

	it("should fetch the user's dob", (done)=>{
		mock(`${url}/dob`, {
			method: 'GET',
			headers: {'Content-Type':'application/json'},
			json:{dob:'testing dob'}
		})
		profileActions.getDOB() ( action => {
			try {
				expect(action.type).to.eql(Action.UPDATE_PROFILE)
				expect(action.dob).to.eql('testing dob')
				done()
			} catch(e) {
				done(e)
			}
		})
	})

	it("should fetch the user's email", (done)=>{
		mock(`${url}/email`, {
			method: 'GET',
			headers: {'Content-Type':'application/json'},
			json:{email:'testing email'}
		})
		profileActions.getEmail() ( action => {
			try {
				expect(action.type).to.eql(Action.UPDATE_PROFILE)
				expect(action.email).to.eql('testing email')
				done()
			} catch(e) {
				done(e)
			}
		})
	})

	it("should fetch the user's zipcode", (done)=>{
		mock(`${url}/zipcode`, {
			method: 'GET',
			headers: {'Content-Type':'application/json'},
			json:{zipcode:'testing zipcode'}
		})
		profileActions.getZipcode() ( action => {
			try {
				expect(action.type).to.eql(Action.UPDATE_PROFILE)
				expect(action.zipcode).to.eql('testing zipcode')
				done()
			} catch(e) {
				done(e)
			}
		})
	})

	it("should fetch the user's avatar", (done)=>{
		mock(`${url}/avatars`, {
			method: 'GET',
			headers: {'Content-Type':'application/json'},
			json:{avatars:[{avatar: 'testing avatar'}]}
		})
		profileActions.getAvatar() ( action => {
			try {
				expect(action.type).to.eql(Action.UPDATE_PROFILE)
				expect(action.avatar).to.eql('testing avatar')
				done()
			} catch(e) {
				done(e)
			}
		})
	})

	it('should update headline',(done)=> {
		const username = 'jg37test'
		const headline = 'testing headline'
		mock(`${url}/headline`, {
			method: 'PUT',
			headers: {'Content-Type':'application/json'},
			json: {username, headline}
		})
		profileActions.updateHeadline(headline)((action)=>{
			try{
				expect(action.type).to.eql(Action.UPDATE_PROFILE)
				expect(action.headline).to.eql(headline)
				done()
			}catch(e){
				done(e);
			}
		})
	})
})