import React from 'react'
import { connect } from 'react-redux'
import Follower from './follower'
import { addFollower } from './followingActions'

const FollowingView = ({ followers, addFollower }) => {

	let friendToAdd
	const _addFollower = () => {
		if (friendToAdd && friendToAdd.value) {
			addFollower(friendToAdd.value)
			friendToAdd.value = ''
		}
	} 

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
					<input type="text" id="add-follower-field" placeholder="new friend" ref={ (node) => { friendToAdd = node }}/>
					<button id="add-follower-btn" onClick={_addFollower}> Add </button>
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
	}, (dispatch) => {
		return {
			addFollower: (userId) => {dispatch(addFollower(userId))}
		}
	})(FollowingView)