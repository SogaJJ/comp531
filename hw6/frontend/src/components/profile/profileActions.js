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

export function updateAvatar(username, fd) {
	console.log('in updateAvatar()', username, fd.get('image'))
	return (dispatch) => {
		return fetch('https://webdev-dummy.herokuapp.com/avatar', {
			method: 'PUT',
			credentials: 'include',
			body: fd
		})
		.then(r => {
			return (r.headers.get('Content-Type').indexOf('json') > 0) ? r.json() : r.text()
		})
		.then(response => {
			console.log('response', response)
			dispatch({
				type: Action.UPDATE_AVATAR,
				avatar: response.avatar
			})
		})
		.catch((err) => {
			console.log('updateAvatar error: ' + err);
		})	
	}
}

export function updateEmail(email) {
	return (dispatch) => {
		return resource('PUT', 'email', {
			email: email
		})
		.then(response => {
			dispatch({type: Action.UPDATE_PROFILE, email: response.email})
		})
		.catch((err) => {
			console.log('updateEmail error: ' + err);
		})	
	}
}

export function updateZipcode(zipcode) {
	return (dispatch) => {
		return resource('PUT', 'zipcode', {
			zipcode: zipcode
		})
		.then(response => {
			dispatch({type: Action.UPDATE_PROFILE, zipcode: response.zipcode})
		})
		.catch((err) => {
			console.log('updateZipcode error: ' + err);
		})	
	}
}

export function updatePwd(password) {
	return (dispatch) => {
		return resource('PUT', 'password', {
			password: password
		})
		.then(response => {
			// TO-DO
			// display mesge
			console.log(response)
		})
		.catch((err) => {
			console.log('updateZipcode error: ' + err);
		})	
	}
}

