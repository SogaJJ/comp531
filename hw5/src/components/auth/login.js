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
			<div className="register-login-title">
				<h3>
					Login
				</h3>
				<hr className="hr-primary" />
			</div>

			<div className="row register-input-row">
				<div className="col-md-4">
					Account: 
				</div>
				<div className="col-md-8">
					<input type='text' ref={ (node) => { username = node }}></input>
				</div>
			</div>

			<div className="row register-input-row">
				<div className="col-md-4">
					Password: 
				</div>
				<div className="col-md-8">
					<input type='password' ref={(node) => { password = node }}></input>
				</div>
			</div>



	
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