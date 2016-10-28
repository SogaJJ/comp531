import React from 'react'
import { connect } from 'react-redux'
import { login } from './authActions'

const Login = ({login}) => {
	let username, password

	const _login = () => {
		if( username && username.value && password && password.value) {
			login(username.value, password.value)
			username.value = ''
			password.value = ''
		}
	}

	return (
		<div>
			<h3> Login</h3>
			<table className="table table-hover">
				<tr className="spaced-row">
					<td>
						Account:
					</td>
					<td>
						<input type='text' ref={ (node) => { username = node }}></input>
					</td>
				</tr>
				<tr  className="spaced-row">
					<td>
						Password:
					</td>
					<td>
						<input type='password' ref={(node) => { password = node }}></input>
					</td>
				</tr>
			</table>
			jg37test
			length-butter-fierce	
			<div className='col-md-12'>	
			<button className='btn btn-primary' onClick={_login}> login </button>
			</div>
		</div>
	)

}

export default connect(null,
	(dispatch) => {
		return {
			login: (username, password) => dispatch(login(username, password))
		}


	})(Login)