var password = ""
var phone
var email
var zipcode
var displayName

function validateInfo() { 
    var invalidMessage = "" 
    // validate displya name
    displayName = document.getElementById("displayNameField").value

    // validate phone
    phone = document.getElementById("phoneField").value
    if (phone != "" && !/^([0-9]{10})$/.test(phone)) {
        invalidMessage += "  - Phone format wrong (10 digit number only) \n"
    }

    // validate email
    email = document.getElementById("emailField").value
    if (email != "" && !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(email)) {
        invalidMessage += "  - Email format wrong \n"
    }

    // validate zipcode
    zipcode = document.getElementById("zipcodeField").value
    if (zipcode != "" && !/^[0-9]{5}$/.test(zipcode)) {
        invalidMessage += "  - Zipcode format wrong (5 digit number only) \n"
    }

    // validate password       
    password = document.getElementById("pass1Field").value;
    var confirm_password = document.getElementById("pass2Field").value;
    if (password != confirm_password) {
        invalidMessage += "  - Password Don't match \n"
    } 

    if (invalidMessage != "") {
        window.alert("Invalid Input: \n" + invalidMessage)
    } else {
        updateProfile()
    }
}

function updateProfile() {
    var updateMessage = ""
    if (displayName != "" && displayName != document.getElementById("displayName").value) {
        updateMessage += "  - Display Name \n"
    }
    if (phone != "" && phone != document.getElementById("phone").value) {
        updateMessage += "  - Phone \n"
    }
    if (email != "" && email != document.getElementById("email").value) {
        updateMessage += "  - Email \n"
    }
    if (zipcode != "" && zipcode != document.getElementById("zipcode").value) {
        updateMessage += "  - Zipcode \n"
    }
    if (password != "" && password != document.getElementById("pass1").value) {
        updateMessage += "  - Password \n"
    }
    window.alert("The following fields will be updated: \n" + updateMessage)
    update(); 
}

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
        document.getElementById("pass2").innerHTML = password
        document.getElementById("pass1Field").value = ""
        document.getElementById("pass2Field").value = ""
    }   
}
