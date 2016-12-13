import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test Landing page...', () => {


    before('should log in', (done) => {
        go().then(done)
    })

    it('should Register new user', (done) => {
        sleep(1000)
        .then(findId('register-username').clear())
        .then(findId('register-username').sendKeys('test-username'))
        .then(sleep(500))
        .then(findId('register-email').clear())
        .then(findId('register-email').sendKeys('test@test.com'))
        .then(sleep(500))
        .then(findId('register-dob').clear())
        .then(findId('register-dob').sendKeys('11-11-1111'))
        .then(sleep(500))
        .then(findId('register-zipcode').clear())
        .then(findId('register-zipcode').sendKeys('12345'))
        .then(sleep(500))
        .then(findId('register-password').clear())
        .then(findId('register-password').sendKeys('123'))
        .then(sleep(500))
        .then(findId('register-password-confirm').clear())
        .then(findId('register-password-confirm').sendKeys('123'))
        .then(sleep(500))
        .then(findId('register').click())
        .then(sleep(2000))
        .then(findId('success-message').getText().then(text => {
            expect(text).to.eql('You successfully registered!')
        }))
        .then(done)
    })

    it('should login as test user', (done) => {
        sleep(2000)
        .then(common.login)
        .then(expect(findId('main-page-header')).to.exist)
        .then(done)
    })

    after('should logout', (done) => {
        sleep(2000)
        .then(common.logout)
        .then(done)
    })
})
