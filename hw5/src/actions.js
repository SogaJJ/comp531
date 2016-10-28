import fetch from 'isomorphic-fetch'

const localTest = true
export const url = localTest ? 'http://localhost:5555' : 'https://webdev-dummy.herokuapp.com'

//const url = 'https://webdev-dummy.herokuapp.com'

const Action = {
	LOGIN: 'LOGIN',
	LOGOUT: 'LOGOUT',
	ERR: 'ERROR',
	SUCCESS: 'SUCCESS', 

	NAV2MAIN: 'NAV2MAIN',
	NAV2LANDING: 'NAV2LANDING',
	NAV2PROFILE: 'NAV2PROFILE',

	UPDATE_PROFILE: 'UPDATE_PROFILE',

	UPDATE_FOLLOWER: 'UPDATE_FOLLOWER',

	UPDATE_ARTICLES: 'UPDATE_ARTICLES',
	UPDATE_KEYWORD: 'UPDATE_KEYWORD',

}
export default Action

export function nav2Main() {
	return {type: Action.NAV2MAIN}
}

export function nav2Profile() {
	return {type: Action.NAV2PROFILE}
}

export function nav2Landing() {
	return {type: Action.NAV2LANDING}
}

export function updateError(errMsg) {
	return {
		type: Action.ERR,
		msg: errMsg
	}
}

export function updateSuccess(successMsg) {
	return {
		type: Action.SUCCESS,
		msg: successMsg
	}
}

export function resource(method, endpoint, payload) {
	
	const options =  {
		method,
		credentials: 'include',
		headers: {'Content-Type': 'application/json'}
	}
	if (payload) options.body = JSON.stringify(payload)

	return fetch(`${url}/${endpoint}`, options)
	.then(r => {
		if (r.status === 200) {
			return (r.headers.get('Content-Type').indexOf('json') > 0) ? r.json() : r.text()
		} else {
			// useful for debugging, but remove in production
			//console.error(`${method} ${endpoint} ${r.statusText}`)
			throw new Error(r.statusText)
		}
	})
}