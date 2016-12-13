import React from 'react'
import { connect } from 'react-redux'
import { login, FBlogin } from './authActions'
import {url} from '../../actions'

const Login = ({login, FBlogin}) => {
	let username, password

	const _login = () => {
		if( username && username.value && password && password.value) {
			login(username.value, password.value)
			username.value = ''
			password.value = ''
		}
	}

	const _FBlogin = () => {
		FBlogin()
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
					<input type='text' id="username" ref={ (node) => { username = node }}></input>
				</div>
			</div>

			<div className="row register-input-row">
				<div className="col-md-4">
					Password: 
				</div>
				<div className="col-md-8">
					<input type='password' id="password" ref={(node) => { password = node }}></input>
				</div>
			</div>

			<div className='col-md-12'>	
				<div className='col-md-4'>
					<button className='btn btn-primary' id="login" onClick={_login}> login </button>
				</div>
				<div className='col-md-6'>
					<button className='btn btn-primary' onClick={_FBlogin}>Facebook Login</button>
				</div>
			</div>

			
		</div>
	)

}

export default connect(null,
	(dispatch) => {
		return {
			login: (username, password) => dispatch(login(username, password)),
			FBlogin: () => dispatch(FBlogin())
		}


	})(Login)