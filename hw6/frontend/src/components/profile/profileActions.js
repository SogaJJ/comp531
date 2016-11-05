import Action, { resource } from '../../actions'

export function getHeadline(username) {
	return (dispatch) => {
		return resource('GET', `headlines/${username}`)
		.then((response) => {
			dispatch({type: Action.UPDATE_PROFILE, headline: response.headlines[0].headline})
		})
	}
}

export function updateHeadline(text) {
	return (dispatch) => {
		return resource('PUT', 'headline', {'headline': text})
		.then((response) => {
			dispatch({type: Action.UPDATE_PROFILE, headline: response.headline})
		})
	}
}

export function getAvatar() {
	return (dispatch) => {
		return resource('GET', 'avatars')
		.then((response) => {
			dispatch({type: Action.UPDATE_PROFILE, avatar: response.avatars[0].avatar})
		})
	}
}
export function getEmail() {
	return (dispatch) => {
		return resource('GET', 'email')
		.then((response) => {
			dispatch({type: Action.UPDATE_PROFILE, email: response.email})
		})
	}
}
export function getDOB() {
	return (dispatch) => {
		return resource('GET', 'dob')
		.then((response) => {
			dispatch({type: Action.UPDATE_PROFILE, dob: response.dob})
		})
	}
}
export function getZipcode() {
	return (dispatch) => {
		return resource('GET', 'zipcode')
		.then((response) => {
			dispatch({type: Action.UPDATE_PROFILE, zipcode: response.zipcode})
		})
	}
}

export function getProfile(){
	return (dispatch) => {
		dispatch(getAvatar())
		dispatch(getEmail())
		dispatch(getZipcode())
		dispatch(getDOB())
	}
}