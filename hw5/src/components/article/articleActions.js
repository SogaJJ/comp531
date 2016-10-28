import Promise from 'bluebird'

import Action, { nav2Landing, nav2Main, resource } from '../../actions'
import { getProfile, getHeadline} from '../profile/profileActions'
import {getFollowers} from '../main/followingActions'

export function getArticles() {
	return (dispatch, getState) => {
		return resource('GET', 'articles')
		.then((response)=>{
			const articles = response.articles.reduce((object,item) => {
				object[item._id] = item;
				return object;
			},{})
			dispatch({type:Action.UPDATE_ARTICLES, articles});
		})
	}
}

export function filterKeyword(keyword) {
	
	return {
		type: Action.UPDATE_KEYWORD,
		keyword: keyword
	}
}