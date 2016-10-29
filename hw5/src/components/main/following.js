import React from 'react'
import { connect } from 'react-redux'

const Follower = ({ username, headline, avatar }) => {
	return (
		<div>
			<div className="row">

				<div className="col-md-4">
					<img className="follower-img" src={avatar} />
				</div>

				<div className="col-md-7 follower-box">
					<h4>{username}</h4>
					<h5>{headline}</h5>
				</div>


			</div>
			<div className="row">
					<hr className="hr-primary" />
			</div>





		</div>
	)
}

const FollowingView = ({ followers }) => {

	return (
		<div>
			<div className="col-md-12">
			
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

			<div className="row">
				<div className="col-md-8 col-md-offset-2">
					<input type="text" placeholder="new friend" />
					<button> Add </button>
				</div>
				
			</div>


		</div>
	)
}

export default connect(
	(state) => {
		return {
			followers: state.follow.followers
		}
	},)(FollowingView)