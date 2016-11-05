import Action, { nav2Main, resource } from '../../actions'



export function getFollowers() {
	return (dispatch) => {
		resource('GET','following/')
		.then((response)=>{
			if (response.following.length == 0) {
				dispatch({type:Action.UPDATE_FOLLOWER, followers: {}})
			} else {
				const followers = response.following.reduce((object, item)=>{object[item] = {name: item}; return object},{})
				const followersStr = response.following.join(',')
				const followersHeadline = resource('GET',`headlines/${followersStr}`)
				.then((headlineResponse) => {
					headlineResponse.headlines.forEach((item) =>{
						followers[item.username].headline = item.headline;
					})
				})			
				const followersAvatar = resource('GET',`avatars/${followersStr}`)
				.then((avatarResponse) => {
					avatarResponse.avatars.forEach((item) =>{
						followers[item.username].avatar = item.avatar;
					})
				})
				Promise.all([followersHeadline, followersAvatar]).then(()=>{
					dispatch({type:Action.UPDATE_FOLLOWER, followers: followers})
				})				
			}
		}).catch((err) => {
			console.log('GetFollowers error: '+err);
		})
	}
}

export function addFollower(userId) {
	console.log('inside addFollower(), userId is ', userId)
	let endpoint = 'following/' + userId
	return (dispatch) => {
		resource('PUT', endpoint)
		.then((response) => {
			console.log('response is ', response)
			dispatch(getFollowers())
		})
		.catch( (err) => {
			console.log('addFollower error: '+err);
		})
	}
}

export function removeFollower(userId) {
	let endpoint = 'following/' + userId
	return	(dispatch) => {
		resource('DELETE', endpoint)
		.then((response) => {
			dispatch(getFollowers())
		})
		.catch((err) => {
			console.log('removeFollower error: '+err);
		})	
	}
}












