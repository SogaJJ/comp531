import React from 'react'
import { connect } from 'react-redux'
import NaviBar from '../main/nav'
import { updateAvatar, updateEmail, updateZipcode, updatePwd, checkAccount, linkToLocal } from './profileActions'
import {FBlogin} from '../auth/authActions'


const Profile = ({avatar, headline, email, zipcode, username, accoutStat, updateAvatar, updateEmail, updateZipcode,updatePwd, checkAccount, linkToLocal, FBlogin}) => {

	let fd = new FormData()
	let emailField
	let zipcodeField
	let pwdField
	let pwdCfmField
	let profileMsg


	const _updateAvatar = () => {
		updateAvatar(username, fd)
	}

	const handleImageChange = (e) => {
		fd.append('image', e.target.files[0]);
	}

	const showMsg = (msg, correctMsg) => {
        profileMsg.innerText = msg
        profileMsg.className = correctMsg ? "col-md-10 profile-message-right" : "col-md-10 profile-message-wrong"

	}

	const _updateProfile = () => {
		let msg = ''
		let correctMsg = true
		if (emailField && emailField.value) {
			if (emailField.value != "" && !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(emailField.value)) {
		        msg = msg + 'invalid email address \n'
		        correctMsg = correctMsg && false
		    } else {
		    	updateEmail(emailField.value)
		    	msg = msg + 'udpate email address \n'
		    }
		    emailField.value = ''
		}

		if (zipcodeField && zipcodeField.value) {
			if (zipcodeField.value != "" && !/^[0-9]{5}$/.test(zipcodeField.value)) {
		        msg = msg + 'invalid zipcode \n'
		        correctMsg = correctMsg && false
			} else {
				updateZipcode(zipcodeField.value)
				msg = msg + 'udpate zipcode \n'
			}
			zipcodeField.value = ''
		}
		
		if (pwdField && pwdField.value || (pwdCfmField && pwdCfmField.value)) {
			if (pwdField.value !== pwdCfmField.value) {
		        msg = msg + 'password not match\n'
		        correctMsg = correctMsg && false
			} else {
				updatePwd(pwdField.value)
				msg = msg + 'udpate password\n'
			}
			pwdField.value = ''
			pwdCfmField.value = ''
		}
		showMsg(msg, correctMsg)
	}


	let accountUsername
	let accountPwd

	const _linkToLocal = (username, password) => {
		linkToLocal(accountUsername.value, accountPwd.value)
		accountUsername.value = ''
		accountPwd.value = ''
	}


	// account status
	let localAccount = accoutStat === 'local'
	let facebookAccount = accoutStat === 'facebook'
	let linkedAccount = accoutStat === 'linked'
	console.log("accoutStat is ", accoutStat)
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
						<div className="row">
							<img src={avatar} className="profile-avatar"/>
						</div>
						
						<div className="row space-row">
							<input type="file" accept="image/*" onChange={(e) => handleImageChange(e)} />
						</div>

						<div className="row space-row">
							<div className="col-md-6">
								<button className="btn btn-primary" onClick={_updateAvatar}> update avatar </button>
							</div>
							<div className="col-md-6">
								<button className="btn btn-danger" onClick={checkAccount}> Show Link Account Option</button>
							</div>
						</div>

						<div className="row space-row"></div>

						<div className="col-md-12" id={accoutStat == 'facebook' ? "" : "profile-page-link-local"}>
							You are signed in as a Facebook Account
							<div className="row space-row"  >
								<button className="btn btn-primary" onClick={_linkToLocal}>Link Ricezone Account</button>
								<div className="row"></div>
									<div className="row">
										<input type="text" size = {15} ref={ (node) => { accountUsername = node }} placeholder="Username" />
									</div>
									<div className="row">
										<input type="text" size = {15} ref={ (node) => { accountPwd = node }} placeholder="Password" />
									</div>
							</div>
						</div>

						<div className="col-md-12" id={accoutStat == 'local' ? "" : "profile-page-link-local"}>
							You are signed in as a Ricezone Account
							<div className="row space-row"  >
								<button className="btn btn-primary" onClick={FBlogin}>Link Facebook</button>
							</div>
						</div>

						<div className="col-md-12" id={accoutStat == 'unlink' ? "" : "profile-page-link-local"}>
							You are signed in as a linked Account
							<div className="row space-row">
								<button className="btn btn-danger">Unlink Account</button>
							</div>

						</div>

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
								<input type="text" size = {25} placeholder="update your account name" />
							</div>		     
						</div>
						<div className="row info">
							<div className="col-md-2">
								Email:
							</div>
							<div className="col-md-3" id="profile-email" >
								{email}
							</div>
							<div className="col-md-7">
								<input type="text" size = {25} id="profile-update-email" ref={ (node) => { emailField = node }} placeholder="update your email" />
							</div>		     
						</div>
						<div className="row info">
							<div className="col-md-2">
								Zipcode:
							</div>
							<div className="col-md-3" id="profile-zipcode">
								{zipcode}
							</div>
							<div className="col-md-7">
								<input type="text" size = {25} id="profile-update-zipcode" ref={ (node) => { zipcodeField = node }} placeholder="update your zipcode" />
							</div>		     
						</div>
						<div className="row info">
							<div className="col-md-2">
								
							</div>
							<div className="col-md-3">
								
							</div>
							<div className="col-md-7">
								<input type="password" size = {25} id="profile-update-password" ref={ (node) => { pwdField = node }} placeholder="Password" />
							</div>		     
						</div>
						<div className="row info">
							<div className="col-md-2">
								
							</div>
							<div className="col-md-3">
								
							</div>
							<div className="col-md-7">
								<input type="password" size = {25} id="profile-update-password-confirm" ref={ (node) => { pwdCfmField = node }} placeholder="Confirm Password" />
							</div>		     
						</div>
						<div className="row info">
							<div className="col-md-5"></div>
							<div className="col-md-2">
								<button className="btn btn-primary" id="profile-update-btn" onClick={_updateProfile}> Update </button>
							</div>
							<div className="col-md-3">
								<button className="btn btn-danger"> Clear </button>
							</div>		     
						</div>
						

						
					</div>
					

					<div className="col-md-10" id='profile-message' ref={ (node) => { profileMsg = node }} >
						
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
			username: state.profile.username,
			accoutStat: state.profile.accoutStat
		}	
	}, 
	(dispatch) => {
		return {
			updateAvatar: (username, fd) => dispatch(updateAvatar(username, fd)),
			updateEmail: (email) => dispatch(updateEmail(email)),
			updateZipcode: (zipcode) => dispatch(updateZipcode(zipcode)),
			updatePwd: (pwd) => dispatch(updatePwd(pwd)), 
			checkAccount: () => dispatch(checkAccount()),
			linkToLocal: (username, password) => dispatch(linkToLocal(username, password)),
			FBlogin: () => dispatch(FBlogin())
		}
	})(Profile)