import React from 'react'
import { connect } from 'react-redux'

const Follower = ({ username, headline, avatar }) => {
	return (
		<div>
			<div className="col-md-8 col-md-offset-2">
				<div className="col-md-12">
					<img className="follower-img" src={avatar} />
				</div>
				<div className="col-md-12">
					<h4>{username}</h4>
				</div>
				<div className="col-md-12">
					<h5>{headline}</h5>
				</div>
				<div className="col-md-12">
					<hr className="hr-primary" />
				</div>
			</div>
		</div>
	)
}

const FollowingView = ({ followers }) => {

	return (
		<div>
			<div className="col-md-12">
			This is following view
			</div>

			{Object.keys(followers).sort().map((username) => 
				followers[username]).map((follower) => 
					<Follower key = {follower.name} 
							  username = {follower.name} 
							  avatar = {follower.avatar} 
							  headline = {follower.headline}
					/>
				)	
			}


		</div>
	)
}

export default connect(
	(state) => {
		return {
			followers: state.follow.followers
		}
	},)(FollowingView)