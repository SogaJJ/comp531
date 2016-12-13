import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test Landing page...', () => {


    before('should log in', (done) => {
        go().then(common.login)
        .then(findId('nav-to-profile').click())
        .then(sleep(1000))
        .then(done)
    })

    it('Update user email and verify', (done) => {
        let oldEmail = 'old@old.com'
        let newEmail = 'new@new.com'
        sleep(500)
        .then(findId('profile-update-email').sendKeys(oldEmail))
        .then(findId('profile-update-btn').click())
        .then(sleep(500))
        .then(findId('profile-email').getText().then(email => {
            expect(email).to.eql(oldEmail)
        }))
        .then(findId('profile-update-email').sendKeys(newEmail))
        .then(findId('profile-update-btn').click())
        .then(sleep(500))
        .then(findId('profile-email').getText().then(email => {
            expect(email).to.eql(newEmail)
        }))
        .then(done)
    })

    it('Update user zipcode and verify', (done) => {

        sleep(500)
        .then(findId('profile-update-zipcode').sendKeys('00000'))
        .then(findId('profile-update-btn').click())
        sleep(500)
        .then(findId('profile-zipcode').getText().then(email => {
            expect(email).to.eql('00000')
        }))
        .then(findId('profile-update-zipcode').sendKeys('11111'))
        .then(findId('profile-update-btn').click())
        .then(sleep(500))
        .then(findId('profile-zipcode').getText().then(email => {
            expect(email).to.eql('11111')
        }))
        .then(done)
    })

    it('Update user password and verify', (done) => {
        sleep(500)
        .then(findId('profile-update-password').clear())
        .then(findId('profile-update-password').sendKeys('123'))
        .then(findId('profile-update-password-confirm').clear())
        .then(findId('profile-update-password-confirm').sendKeys('321'))
        .then(findId('profile-update-btn').click())
        .then(sleep(500))
        .then(findId('profile-message').getText().then(message => {
            expect(message).to.eql('password not match')
        }))
        .then(findId('profile-update-password').clear())
        .then(findId('profile-update-password').sendKeys('123'))
        .then(findId('profile-update-password-confirm').clear())
        .then(findId('profile-update-password-confirm').sendKeys('123'))
        .then(findId('profile-update-btn').click())
        .then(sleep(500))
        .then(findId('profile-message').getText().then(message => {
            expect(message).to.eql('udpate password')
        }))
        .then(done)
    })

    after('should logout', (done) => {
        sleep(500)
        .then(common.logout)
        .then(done)
    })
})
