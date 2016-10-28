import { combineReducers } from 'redux'
import Action from './actions'

const common = (state = {
	location: 'LANDING',
	errMsg: '',
	updateMsg: ''
	}, action) => {
	
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
		case Action.LOGOUT:
			return {
				...state,
				location:'LANDING'
			}
		default :
			return state
	}
}


const articles = (state, action) => {
	switch(action.type) {

	}
}

const article = (state = {articles: {}, keyword: ''}, action) => {
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
		default:
			return state
	}
}

const follow = (state = {followers:{}}, action) => {
	switch(action.type) {
		case Action.UPDATE_FOLLOWER:
			return {
				...state, 
				followers: action.followers
			}
		default:
			return state
	}
}

const profile = (state = 
	{username: '', 
	email: '', 
	zipcode: '', 
	password: '', 
	headline: '', 
	avatar: ''}, 
	action) => {
	switch(action.type) {
		case Action.LOGIN :
			return {
				...state,
				username: action.username
			}
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