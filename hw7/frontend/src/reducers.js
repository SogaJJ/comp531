import { combineReducers } from 'redux'
import Action from './actions'

export const initCommonState = {
	location: 'LANDING',
	errMsg: '',
	updateMsg: ''
	}

export const common = (state = initCommonState, action) => {
	switch(action.type) {
		case Action.NAV2MAIN : 
			return {
				...state,
				location: 'MAIN'
			}
		case Action.NAV2LANDING : 
			return {
				...state,
				location: 'LANDING'
			}
		case Action.NAV2PROFILE : 
			return {
				...state,
				location: 'PROFILE'
			}
		case Action.ERR :
			return {
				...state, 
				errMsg: action.msg
			}
		case Action.SUCCESS :
			return {
				...state, 
				updateMsg: action.msg
			}
		case Action.LOGOUT:
			return {
				...state,
				location:'LANDING'
			}
		default :
			return state
	}
}

export const initArticleState = {articles: {}, keyword: ''}

export const article = (state = initArticleState, action) => {
	switch(action.type) {
		case Action.UPDATE_ARTICLES :
			return {
				...state,
				articles: action.articles
			}
		case Action.UPDATE_KEYWORD:
			return {
				...state,
				keyword: action.keyword
			}
		case Action.TOGGLE_COMMENT:
			let articleId = action.article_id
			let newArticles = Object.assign({}, state.articles)
			newArticles[articleId].showComments = !newArticles[articleId].showComments

			return {
				...state,
				articles: newArticles
			}
		case Action.BEGIN_COMMENT:
			let beginCommentArticleId = action.article_id
			let newArticlesBeginComments = Object.assign({}, state.articles)
			newArticlesBeginComments[beginCommentArticleId].addCommentStatus = true
			return {
				...state,
				articles: newArticlesBeginComments
			}
		case Action.CANCEL_COMMENT:
			let cancelCommentArticleId = action.article_id
			let newArticlesCancelComments = Object.assign({}, state.articles)
			newArticlesCancelComments[cancelCommentArticleId].addCommentStatus = false
			return {
				...state,
				articles: newArticlesCancelComments
			}	
		case Action.POST_COMMENT:
			let postCommentArticleId = action.article_id
			let newArticlesPostComments = Object.assign({}, state.articles)
			let newArticle = action.newArticle
			newArticle.showComments = newArticlesPostComments[postCommentArticleId].showComments
			newArticle.addCommentStatus = newArticlesPostComments[postCommentArticleId].addCommentStatus
			newArticlesPostComments[postCommentArticleId] = action.newArticle
			return {
				...state,
				articles: newArticlesPostComments
			}	
		case Action.EDIT_COMMENT:
			let newEditCommentArticle = action.article
			let newEditCommentArticleid = newEditCommentArticle._id
			let newnewEditCommentArticles = Object.assign({}, state.articles)
			newnewEditCommentArticles[newEditCommentArticleid].comments = newEditCommentArticle.comments

			return {
				...state, 
				articles: newnewEditCommentArticles
			}
		case Action.POST_ARTICLE:
			let newPostArticle = action.article
			newPostArticle.showComments = false
			newPostArticle.addCommentStatus = false
			let postArticleId = action.article._id
			let newArticlesPostArticle = Object.assign({}, state.articles)
			newArticlesPostArticle[postArticleId] = newPostArticle
			return {
				...state,
				articles: newArticlesPostArticle
			}
		case Action.EDIT_ARTICLE: 
			let newEditArticle = action.article
			let editArticleId = newEditArticle._id
			let newArticlesEdit = Object.assign({}, state.articles)
			newArticlesEdit[editArticleId].text = newEditArticle.text
			return {
				...state,
				articles: newArticlesEdit
			}
		default:
			return state
	}
}

export const initFollowState = {followers:{}, followerErrMsg: ''}

export const follow = (state = initFollowState, action) => {
	switch(action.type) {
		case Action.UPDATE_FOLLOWER:
			return {
				...state, 
				followers: action.followers
			}
		case Action.PROFILE_ERR:
			return {
				...state,
				followerErrMsg: action.msg
			}
		default:
			return state
	}
}


export const initProfileState = {
	username: '', 
	email: '', 
	zipcode: '', 
	password: '', 
	headline: '', 
	avatar: ''}

export const profile = (state = initProfileState,  action) => {
	switch(action.type) {
		case Action.LOGIN :
			return {
				...state,
				username: action.username
			}
		case Action.UPDATE_AVATAR: 
			return {
				...state,
				avatar: action.avatar
			}
			return state
		case Action.UPDATE_PROFILE :
			if (action.zipcode) {
				return {
					...state,
					zipcode: action.zipcode
				}
			}
			if (action.email) {
				return {...state, email: action.email}
			}
			if (action.avatar) {
				return {
					...state,
					avatar: action.avatar
				}
			}
			if (action.headline) {
				return {
					...state,
					headline: action.headline
				}
			}
			if (action.dob) {
				return {...state,
					dob: action.dob
				}
			}
		default :
			return state
	}
}


const Reducer = combineReducers({ common, profile, follow, article })

export default Reducer