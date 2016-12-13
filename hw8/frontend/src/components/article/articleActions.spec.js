import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

import Action from '../../actions'

let resource, getArticles, url, filterKeyword

describe('Validate article ctions', () => {

    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')        
        }
        url = require('../../actions').url
        resource = require('../../actions').resource
        getArticles = require('./articleActions').getArticles
        filterKeyword = require('./articleActions').filterKeyword
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        } 
    })  

    it('should fetch articles (mocked request)', (done)=>{
        let articleOrigin = [{"_id":1,  
            "text":"aaa",
            "date":"2015-09-03T07:39:46.715Z",
            "comments":[],
            "author":"jg37"}]
        
        mock(`${url}/articles`, {
            method: 'GET',
            headers: {'Content-Type':'application/json'},
            json:{articles: articleOrigin}
        })

        getArticles()((action)=>{
            try{    
                expect(action.type).to.eql(Action.UPDATE_ARTICLES)
                expect(action.articles).to.exist;
                expect(action.articles[1].author).to.eql('jg37');
                done()
            }
            catch(e){
                done(e)
            }   
        })
    })

    it('should update the search keyword', () => {
        expect(filterKeyword('test').type).to.eql(Action.UPDATE_KEYWORD);
        expect(filterKeyword('test').keyword).to.eql('test');
    })


})