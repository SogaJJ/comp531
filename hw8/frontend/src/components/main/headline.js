import React from 'react'
import { connect } from 'react-redux'
import {updateHeadline} from '../profile/profileActions'
import Action, { resource } from '../../actions'

const Headline = ({username, headline, avatar, updateHeadline}) => {
	let newHeadline

	const _updateHeadline = () => {
		if (newHeadline && newHeadline.value) {
			updateHeadline(newHeadline.value)
			newHeadline.value = ''			
		}
	}
	return (
		<div>
			<div className="col-md-12">
				<img src={avatar} className="main-avatar"/>
			</div>

			<div className="col-md-12">
				<h4> {username} </h4>
			</div>

			<div className="col-md-12" id="main-headline">
				<h4> {headline} </h4>
			</div>

			<div className="col-md-12">
				<input type="text" id="main-headline-field" ref ={ (node) => { newHeadline = node }}/> 
				<button onClick={_updateHeadline} id="main-headline-udpate-btn" > Update Headline</button>
			</div>			
		</div>
	)
}

export default connect(
	(state) => {
	return {
		username : state.profile.username,
		headline: state.profile.headline,
		avatar: state.profile.avatar
	}
}, (dispatch) => {
	return {
		updateHeadline: (text) => dispatch(updateHeadline(text))
	}
})(Headline)