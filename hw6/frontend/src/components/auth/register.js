import React from 'react'
import { connect } from 'react-redux'
import { register } from './authActions'
import { updateError } from '../../actions'



const Register = ({register, sendErr}) => {

	let username
	let email
	let dob
	let zipcode
	let password
	let passwordConfirm

	const _submit = (e) => {
		e.preventDefault();
		if (password.value !== passwordConfirm.value) {
			sendErr('password not match')
			password.value = ''
			passwordConfirm.value = ''
		} else {
			register(username.value, email.value, dob.value, zipcode.value, password.value)
			username.value = ''
			email.value = ''
			dob.value = ''
			zipcode.value = ''
			password.value = ''
			passwordConfirm.value = ''
		}
		
	}


	return (
		<div>
			<div className="register-login-title">
				<h3>
					Register
				</h3>
				<hr className="hr-primary" />
			</div>
			<form className="register-form" onSubmit={(e) => _submit(e)}>
				<div className="row register-input-row">
					<div className="col-md-4">
						Username: 
					</div>
					<div className="col-md-8">
						<input type="text" value="aa" id="register-username" name="test" size="30" placeholder="Username" ref={ (node) => { username = node }} >
						</input>
					</div>
				</div>
				<div className="row register-input-row">
					<div className="col-md-4">
						Email: 
					</div>
					<div className="col-md-8">
						<input type="text" value="aa@aa.com" id="register-email" name="test" size="30" placeholder="email Address" ref={ (node) => { email = node }} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" >
						</input>
					</div>
				</div>
				<div className="row register-input-row">
					<div className="col-md-4">
						Date of Birth: 
					</div>
					<div className="col-md-8">
						<input type="text" value="11-11-1111" id="register-dob" name="test" size="30" placeholder="mm-dd-yyyy" ref={ (node) => { dob = node }} pattern="^\d{1,2}-\d{1,2}-\d{4}$" >
						</input>
					</div>
				</div>
				<div className="row register-input-row">
					<div className="col-md-4">
						Zipcode: 
					</div>
					<div className="col-md-8">
						<input type="text" value="12345" id="register-zipcode" name="test" size="30" placeholder="zipcode" ref={ (node) => { zipcode = node }} pattern="[0-9]{5}" >
						</input>
					</div>
				</div>
				<div className="row register-input-row">
					<div className="col-md-4">
						Password: 
					</div>
					<div className="col-md-8">
						<input type="password" name="password" id="register-password" size="30" ref={ (node) => { password = node }} placeholder="passwprd" required>
						</input>
					</div>					
				</div>
				<div className="row register-input-row">
					<div className="col-md-4">
						Confirm Pwd: 
					</div>
					<div className="col-md-8">
						<input type="password" name="passwordConfirm" id="register-password-confirm" size="30" ref={ (node) => { passwordConfirm = node }} placeholder="confirm passwprd" required>
						</input>
					</div>					
				</div>
				<div className="row register-input-row">
				</div>
				<div className="row register-input-row">
					<div className="col-md-4 col-md-offset-2">
						<input type="submit" className="btn btn-primary" id="register" value="Submit"/>
					</div>
					<div className="col-md-4">
						<input type="reset" className="btn btn-danger" value="Clear"/>
					</div>
				</div>
				
			</form>
		</div>

	)


}

export default connect(
	null,
	(dispatch) => {
		return {
			register: (username, email, dob, zipcode, password) => dispatch(register(username, email, dob, zipcode, password)),
			sendErr: (errorMsg) => dispatch(updateError(errorMsg)),
		}
	}

	)(Register)