import React from 'react'
import { connect } from 'react-redux'
import Main from './main/main.js'
import Profile from './profile/profile.js'
import Landing from './auth/landing.js'
import {initialVisit} from './auth/authActions.js'



const App = ({location, attempLogin}) => {
	if (location == 'MAIN') {
		return <Main />
	} else if (location == 'LANDING') {
		console.log('trying to login......')
		attempLogin()
		return <Landing />
	} 
	return <Profile />
}

export default connect((state) => {
	return {location: state.common.location}
}, (dispatch) => {
	return {
		attempLogin: () => dispatch(initialVisit())
	}



})(App)