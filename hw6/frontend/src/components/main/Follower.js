import React, { PropTypes }  from 'react'
import { connect } from 'react-redux'
import { removeFollower } from './followingActions'

const Follower = ({ username, headline, avatar, removeFollower }) => {

	const _removeFollower = () => {
		removeFollower(username)
	}


	return (
		<div>
			<div className="row">
				<div className="col-md-4">
					<img className="follower-img" src={avatar} />
				</div>

				<div className="col-md-7 follower-box">
					<div className="row">
						<h4>{username}</h4>
						<h5>{headline}</h5>
					</div>
					
					<div className="row">
						<button onClick={_removeFollower}> unfriend </button>
					</div>
				</div>
			</div>

			<div className="row">
					<hr className="hr-primary" />
			</div>
		</div>
	)
}

Follower.propTypes = {
    username: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
}


export default connect(null,
	(dispatch) => {
		return {
			removeFollower: (username) => {dispatch(removeFollower(username))}
		}
	})(Follower)