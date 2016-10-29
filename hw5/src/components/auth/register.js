import React from 'react'
import { connect } from 'react-redux'

const Register = () => {
	return (
		<div>
			<div className="register-login-title">
				<h3>
					Register
				</h3>
				<hr className="hr-primary" />
			</div>
			<form className="register-form">
				<div className="row register-input-row">
					<div className="col-md-4">
						Account: 
					</div>
					<div className="col-md-8">
						<input type="text" name="test" size="30" placeholder="account Name">
						</input>
					</div>
				</div>
				<div className="row register-input-row">
					<div className="col-md-4">
						Email: 
					</div>
					<div className="col-md-8">
						<input type="text" name="test" size="30" placeholder="email Address">
						</input>
					</div>
				</div>
				<div className="row register-input-row">
					<div className="col-md-4">
						Date of Birth: 
					</div>
					<div className="col-md-8">
						<input type="text" name="test" size="30" placeholder="your date of birth">
						</input>
					</div>
				</div>
				<div className="row register-input-row">
					<div className="col-md-4">
						Phone: 
					</div>
					<div className="col-md-8">
						<input type="text" name="test" size="30" placeholder="phone number">
						</input>
					</div>
				</div>
				<div className="row register-input-row">
					<div className="col-md-4">
						Zipcode: 
					</div>
					<div className="col-md-8">
						<input type="text" name="test" size="30" placeholder="zipcode">
						</input>
					</div>
				</div>
				<div className="row register-input-row">
				</div>
				<div className="row register-input-row">
					<div className="col-md-4 col-md-offset-2">
						<input type="submit" className="btn btn-primary" value="Submit"/>
					</div>
					<div className="col-md-4">
						<input type="reset" className="btn btn-danger" value="Clear"/>
					</div>
				</div>
				
			</form>






		</div>

	)


}

export default connect()(Register)