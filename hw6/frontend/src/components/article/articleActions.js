import Promise from 'bluebird'

import Action, { nav2Landing, nav2Main, resource } from '../../actions'
import { getProfile, getHeadline} from '../profile/profileActions'
import {getFollowers} from '../main/followingActions'

export function getArticles() {
	return (dispatch, getState) => {
		return resource('GET', 'articles')
		.then((response)=>{
			
			const articles = response.articles.reduce((object,item) => {
				item.showComments = true;
				item.addCommentStatus = false;
				
				
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

export function toggleComment(article_id) {
	return {
		type: Action.TOGGLE_COMMENT,
		article_id: article_id
	}
}

export function beginComment(article_id) {
	return {
		type: Action.BEGIN_COMMENT,
		article_id: article_id
	}
}

export function cancelComment(article_id) {
	return {
		type: Action.CANCEL_COMMENT,
		article_id: article_id
	}
}

export function postComment(article_id, text) {

	return (dispatch) => {
		let endpoint = 'articles/' + article_id
		var payload = {
			text: text,
			commentId: -1
		}
		return resource('PUT', endpoint, payload)
		.then(response => {
			console.log('response is', response.articles[0])
			dispatch({
				type: Action.POST_COMMENT,
				article_id: article_id,
				newArticle: response.articles[0]
			})
		})
		.catch((err) => {
			console.log('postComment error: ' + err);
		})
	}
}

export function postArticle(text) {
	console.log('in postArticle()')
	let payload = {
		text: text
	}
	return (dispatch) => {
		return resource('POST', 'article', payload)
		.then(response => {
			console.log('response is', response.articles[0])
			dispatch({
				type: Action.POST_ARTICLE,
				article: response.articles[0]
			})

		})
		.catch((err) => {
			console.log('postArticle error: ' + err);
		})
	}
}










