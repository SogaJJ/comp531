import React from 'react'
import { connect } from 'react-redux'
import NaviBar from '../main/nav'

const Profile = ({avatar, headline, email, zipcode, username}) => {
	return (
		<div>
			<div className="row">
				<div className="col-md-10 col-md-offset-1">
					<div className="row">
						<div className="col-md-3">
							<NaviBar />
						</div>
						<div className="col-md-9 profile-header">
							<h1>Your profile in Rice Zone</h1>
						</div>

					</div>

					
				</div>
			</div>

			<div className="col-md-12"> 
				<div className="col-md-4"> 
					<div className="col-md-8 col-md-offset-2">
						<img src={avatar} />
					</div>
					
				</div>		
				<div className="col-md-8"> 
					<div className="col-md-10 well">
						<div className="row info">
							<div className="col-md-5">
								Your info
								<hr className="hr-primary" />
							</div>
							<div className="col-md-5">
								Update
								<hr className="hr-primary" />
							</div>		     
						</div>
						<div className="row info">
							<div className="col-md-2">
								Username:
							</div>
							<div className="col-md-3">
								{username}
							</div>
							<div className="col-md-7">
								<input type="text" size = {30} placeholder="update your account name" />
							</div>		     
						</div>
						<div className="row info">
							<div className="col-md-2">
								Email:
							</div>
							<div className="col-md-3">
								{email}
							</div>
							<div className="col-md-7">
								<input type="text" size = {30} placeholder="update your email" />
							</div>		     
						</div>
						<div className="row info">
							<div className="col-md-2">
								Zipcode:
							</div>
							<div className="col-md-3">
								{zipcode}
							</div>
							<div className="col-md-7">
								<input type="text" size = {30} placeholder="update your zipcode" />
							</div>		     
						</div>
						<div className="row info">
							<div className="col-md-2">
								Headline:
							</div>
							<div className="col-md-3">
								{headline}
							</div>
							<div className="col-md-7">
								<input type="text" size = {30} placeholder="update your headline" />
							</div>		     
						</div>
						
						<div className="row info">
							<div className="col-md-5"></div>
							<div className="col-md-2">
								<button className="btn btn-primary"> Update </button>
							</div>
							<div className="col-md-2">
								<button className="btn btn-danger"> Clear </button>
							</div>		     
						</div>
						

						
					</div>
					
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