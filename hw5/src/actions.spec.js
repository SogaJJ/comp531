import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'
import { expect } from 'chai'

import Action, { nav2Main, nav2Landing, nav2Profile, updateError, updateSuccess, resource } from './actions'


describe('Validate actions (these are functions that dispatch actions)', () => {

	let resource, url

	beforeEach(() => {
		if(mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
  			resource = require('./actions').resource
  			url = require('./actions').url
  		}
	})

	afterEach(() => {
  		if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
  		}
	})

	it('resource should be a resource (i.e., mock a request)', (done)=> {
		
		mock(`${url}/test`, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'},
			json:{articles: {some: 'something'}}
		})

		resource('GET', 'test').then((response) => {
			expect(response.articles).to.exist;
		})
		.then(done).catch(done)
  	})

	it('resource should give me the http error', (done) => {
		resource('GET', 'asdoifhkjashdlfj')
		.catch((error) => {
			expect(error).to.exist;
		})
		.then(done)
		.catch(done)
	})

	it(' resource should be POSTable', (done) => {
		mock(`${url}/test`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			json:{key1: 'value1', key2: 'value2'}
		})		

		resource('POST', 'test', {key1: 'newValue1', key2: 'newValue2'})
		.then((response) => {
			expect(response).to.eql({key1: 'value1', key2: 'value2'})
		})
		.then(done)
		.catch(done)
	})

	it(' should update error message (for displaying error mesage to user)', () => {
		let expectation = {
			type: Action.ERR, 
			msg: 'This is error message'
		}
		expect(updateError('This is error message')).to.eql(expectation);
	})

	it(' should update success message (for displaying success mesage to user)', () => {
		let expectation = {
			type: Action.SUCCESS, 
			msg: 'This is success message'
		}
		expect(updateSuccess('This is success message')).to.eql(expectation);
	})

	it('should navigate PROFILE', ()=>{
		expect(nav2Profile()).to.eql({type: Action.NAV2PROFILE});
	})

	it('should navigate MAIN', ()=>{
		expect(nav2Main()).to.eql({type: Action.NAV2MAIN});
	})

	it('should navigate LANDING', ()=>{
		expect(nav2Landing()).to.eql({type: Action.NAV2LANDING});
	})

})