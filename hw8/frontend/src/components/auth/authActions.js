import Promise from 'bluebird'

import Action, { url, nav2Landing, nav2Main, updateError, resource, updateSuccess } from '../../actions'
import { getProfile, getHeadline, checkAccount} from '../profile/profileActions'
import {getFollowers} from '../main/followingActions'
import { getArticles } from '../article/articleActions'


export function initialVisit() {
	console.log('trying initialVisit ...')
	return (dispatch) => {
		return resource('GET', 'headlines')
		.then((response) => {
			console.log(response.headlines[0])
			//dispatch({type: Action.UPDATE_PROFILE, headline: response.headlines[0].headline})
			Promise.all([
				dispatch({type: Action.LOGIN, username: response.headlines[0].username}),
				dispatch({type: Action.UPDATE_PROFILE, headline: response.headlines[0].headline}),
				dispatch(getProfile()),
				dispatch(getFollowers()),
				dispatch(getArticles())
			])
			.then((response) => {
				dispatch(checkAccount())
			})
			.then((response) => {
				dispatch(nav2Main())
			})
		})
		.catch((err) => {
            console.log(err)
        })
	}
}

export function login(username, password) {
    return (dispatch) => {
        return resource('POST', 'login', { username, password })
        .then((response) => {
            //dispatch({type: Action.LOGIN, username: response.username})
            dispatch(initialVisit())
        }).catch((err) => {
            dispatch(updateError(`Invalid logging in as user: ${username}`))
            setTimeout(function(){dispatch(updateError(''))}, 3000)
        })
    }
	
} 

export function FBlogin() {
	return (dispatch) => {
		console.log('in FBlogin ...')
		window.location = url + '/login/facebook'		
	}
}


export function logout() {
	return (dispatch) => {
		return resource('PUT', 'logout')
		.then((response) => {
			dispatch({type: Action.LOGOUT, locaiton: 'LANDING'})
		})
		.then((response) => {
			dispatch(nav2Landing())
		})
	}
}

export function register(username, email, dob, zipcode, password) {
	return (dispatch) => {
		resource('POST', 'register', {username, email, dob, zipcode, password})
		.then(response => {
			console.log(response)
			dispatch(updateSuccess('You successfully registered!'))
		})
		.catch(err => {
			console.log('register error', err)
		})
	}
}


