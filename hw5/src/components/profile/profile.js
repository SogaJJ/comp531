import React from 'react'
import { connect } from 'react-redux'
import NaviBar from '../main/nav'

const Profile = ({avatar, headline, email, zipcode, username}) => {
	return (
		<div>
			<div className="col-md-12"> 
				<div className="col-md-4"> 
					<NaviBar />
				</div>
				<div className="col-md-8"> 
					<h1>Profile Page</h1>
				</div>
			</div>

			<div className="col-md-12"> 
				<div className="col-md-4"> 
					<img src={avatar} />
				</div>		
				<div className="col-md-8"> 
					<div className="row info">
						Username:       {username}
					</div>
					<div className="row info">
						Email: {email}
					</div>
					<div className="row info">
						Zipcode: {zipcode}
					</div>
					<div className="row info">
						Headline: {headline}
					</div>
					

					<button className="btn btn-primary"> Update </button>
				</div>	
			</div>
		</div>
	)
}

export default connect(
	(state) => {
		return {
			avatar: state.profile.avatar,
			headline: state.profile.headline,
			email: state.profile.email,
			zipcode: state.profile.zipcode,
			username: state.profile.username
		}	
	}, 
	(dispatch) => {
		return {
			updateAvatar: () => dispatch(),
		}
	})(Profile)