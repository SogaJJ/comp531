import Promise from 'bluebird'

import Action, { nav2Landing, nav2Main, updateError, resource, updateSuccess } from '../../actions'
import { getProfile, getHeadline} from '../profile/profileActions'
import {getFollowers} from '../main/followingActions'
import { getArticles } from '../article/articleActions'


const initialVisit = (username) => {
	return (dispatch) => {
		return resource('GET', 'headlines')
		.then((response) => {
			dispatch({type: Action.UPDATE_PROFILE, headline: response.headlines[0].headline})
		})
		.then((response) => {
			dispatch(getProfile())
		})
		.then((response) => {
			dispatch(getFollowers())
		})
		.then((response) => {
			dispatch(getArticles())
		})
		.then((response) => {
			dispatch(nav2Main())
		})
	}
}

export function login(username, password) {
    return (dispatch) => {
        return resource('POST', 'login', { username, password })
        .then((response) => {
            dispatch({type: Action.LOGIN, username: response.username})
            dispatch(initialVisit(username))
        }).catch((err) => {
            dispatch(updateError(`Invalid logging in as user: ${username}`))
            setTimeout(function(){dispatch(updateError(''))}, 3000)
        })
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


