import {expect} from 'chai'

import Action from './actions'
import Reducer, {common, article, initCommonState, initProfileState, initFollowState, initArticleState} from './reducers'
import {processArticles} from './components/article/articlesView'
import {filterKeyword} from './components/article/articleActions'

describe('Validate reducer (no fetch requests here)', ()=> {

	it('should initialize state', ()=>{
		expect(Reducer(undefined,{})).to.eql({
			common: initCommonState,
			profile: initProfileState,
			follow: initFollowState,
			article: initArticleState
		})
	})

	it('should state success (for displaying success message to user)',()=> {
		expect( 
			common(undefined, {type:Action.SUCCESS, msg:'testing success message'})
		)
		.to.eql({location:'LANDING', updateMsg:'testing success message', errMsg:''})
	})

	it('should state error (for displaying error message to user)',()=> {
		expect( 
			common(undefined, {type:Action.ERR, msg:'testing error message'})
		)
		.to.eql({location:'LANDING', errMsg:'testing error message', updateMsg:''})
	})

	it('should set the articles',()=> {
		expect( 
			article(undefined, {type:Action.UPDATE_ARTICLES,  articles:'testing articles' })
		)
		.to.eql({keyword:'', articles:'testing articles'})
	})

	it('should set the search keyword',()=> {
		expect(
			article(undefined, {type:Action.UPDATE_KEYWORD, keyword:'testing keyword'}))
		.to.eql({keyword:'testing keyword', articles:{}})
	})

	it('should filter displayed articles by the search keyword',()=> {
		const articles = {1:{_id:0, text:'aa bb cc', author:'jing', date:'12345'},
						  2:{_id:1, text:'aa bb cc dd', author:'jing', date:'3456'}}
		
		expect(
			article({articles: processArticles(articles, 'dd'), keyword: ''}, filterKeyword('dd'))
			)
		.to.eql({articles: [{_id:1, text:'aa bb cc dd', author:'jing', date:'3456'}], keyword: 'dd'});
	})
})