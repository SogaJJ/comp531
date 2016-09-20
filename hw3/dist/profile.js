(function(){
    console.log('in function')
    var query = window.location.search.replace('?','').split('&')
    query.forEach(function(item){
        console.log(item)
    })
})()

var password = ""
var phone
var email
var zipcode
var displayName

function showPass() {
    document.getElementById('pass1').style.display = 'block';
    document.getElementById('passDescription').style.display = 'block';

}

function hidPass() {
    document.getElementById('pass1').style.display = 'none';
    document.getElementById('passDescription').style.display = 'none';
}

// to hide the password
function hidePass(checkbox) {
    console.log("hidePass() is called" + ". id = " + checkbox.id)
    if (checkbox.checked) {
        document.getElementById("pass1").style.display = 'inline'
        document.getElementById("pass2").style.display = 'inline'

    } else {
        document.getElementById("pass1").style.display = 'none'
        document.getElementById("pass2").style.display = 'none'
    }
}

// validate the input field
function validateInfo() {
    var invalidMessage = ""
    // validate displya name
    displayName = document.getElementById("displayNameField").value

    // validate phone
    phone = document.getElementById("phoneField").value
    if (phone != "" && !/^([0-9]{10})$/.test(phone)) {
        invalidMessage += "  - Phone format wrong (10 digit number only) <br />"
    }

    // validate email
    email = document.getElementById("emailField").value
    if (email != "" && !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(email)) {
        invalidMessage += "  - Email format wrong <br />"
    }

    // validate zipcode
    zipcode = document.getElementById("zipcodeField").value
    if (zipcode != "" && !/^[0-9]{5}$/.test(zipcode)) {
        invalidMessage += "  - Zipcode format wrong (5 digit number only) <br />"
    }

    // validate password
    password = document.getElementById("pass1Field").value;
    var confirm_password = document.getElementById("pass2Field").value;
    if (password != confirm_password) {
        invalidMessage += "  - Password Don't match <br />"
    }

    if (invalidMessage != "") {
        document.getElementById('profile_msg_box').style.display = "inline"
        document.getElementById('profile_msg_type').innerHTML = "Invalid format: <br />"
        document.getElementById('profile_msg_content').innerHTML = invalidMessage
    } else {
        updateProfile()
    }
}

// collect the update message
function updateProfile() {
    var updateMessage = ""
    if (displayName != "" && displayName != document.getElementById("displayName").value) {
        updateMessage += "  - Display Name <br />"
    }
    if (phone != "" && phone != document.getElementById("phone").value) {
        updateMessage += "  - Phone <br />"
    }
    if (email != "" && email != document.getElementById("email").value) {
        updateMessage += "  - Email <br />"
    }
    if (zipcode != "" && zipcode != document.getElementById("zipcode").value) {
        updateMessage += "  - Zipcode <br />"
    }
    if (password != "" && password != document.getElementById("pass1").value) {
        updateMessage += "  - Password <br />"
    }
    // window.alert("The following fields will be updated: \n" + updateMessage)
    document.getElementById('profile_msg_box').style.display = "inline"
    document.getElementById('profile_msg_type').innerHTML = "Following will be updated: <br />"
    document.getElementById('profile_msg_content').innerHTML = updateMessage
    setTimeout(function(){
        document.getElementById('profile_msg_box').style.display = "none"
    }, 3000)
    update();
}

// update the attribute
function update() {
    if (displayName != "" && displayName != document.getElementById("displayName").value) {
        document.getElementById("displayName").innerHTML = displayName
        document.getElementById("displayNameField").value = ""
    }
    if (phone != "" && phone != document.getElementById("phone").value) {
        document.getElementById("phone").innerHTML = phone
        document.getElementById("phoneField").value = ""
    }
    if (email != "" && email != document.getElementById("email").value) {
        document.getElementById("email").innerHTML = email
        document.getElementById("emailField").value = ""
    }
    if (zipcode != "" && zipcode != document.getElementById("zipcode").value) {
        document.getElementById("zipcode").innerHTML = zipcode
        document.getElementById("zipcodeField").value = ""
    }
    if (password != "" && password != document.getElementById("pass1").value) {
        document.getElementById("pass1").innerHTML = password
        document.getElementById("pass1Field").value = ""
        document.getElementById("pass2Field").value = ""
    }
}
