import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'
import { expect } from 'chai'

import Action from '../../actions'


describe('Validate actions (these are functions that dispatch actions)', () => {
	let resource
	let url
	let login
	let logout

	beforeEach(() => {
		if(mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
			resource = require('../../actions').default
  			url = require('../../actions').url
  			login = require('./authActions').login
  			logout = require('./authActions').logout

  		}
	})

	afterEach(() => {
  		if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
  		}
	})

    it('should log in a user', (done)=>{

        const username = "jg37test"
        const password = "length-butter-fierce"

        mock(`${url}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            json: {username, result:'success'}
        })
     
        let count = 0;
        login(username,password)((action) => {
            try {
                if(action.type===Action.LOGIN) {
                    expect(action.username).to.eql(username);
                }
                count++;
            } catch (e) {
                done(e)
            }
        })
        .then(() => {
            expect(count).to.eql(2)
        })
        .then(done)
        .catch(done)
    })

    it('should log out a user (state should be cleared)', (done)=>{

        mock(`${url}/logout`,{
            method: 'PUT',
            headers: {'Content-Type':'application/json'}
        })


        logout()(
            (action)=>{
                expect(action.type === Action.LOGOUT || action.type === Action.NAV2LANDING).to.be.true
            }
        )
        done()
        
    })

	it('Test Auth: should not log in an invalid user', (done) => {

        const username = "jg37test"
        const password = "aksjldf"

        mock(`${url}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            json: {username, result:'success'}
        })
     
        login(username, password)((action)=>{              
            expect(action.type).to.eql(Action.ERR);
        })	
        .then(done)
        .catch(done)

	})
})



