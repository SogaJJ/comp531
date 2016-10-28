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
					<table className="table table-hover">
						<tr>
							<td>Username: </td>
							<td>{username}</td>
						</tr>
						<tr>
							<td>Email: </td>
							<td>{email}</td>
						</tr>
						<tr>
							<td>Zipcode: </td>
							<td>{zipcode}</td>
						</tr>
						<tr>
							<td>Headline: </td>
							<td>{headline}</td>
						</tr>
					</table>

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