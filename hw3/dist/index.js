function login() {
    var username = document.getElementById('username')
    var password = document.getElementById('password');
    var msg = document.getElementById('index_msg')
    if (username.value == "" || password.value == ""){
        msg.style.display = 'inline'
        setTimeout(function(){
            msg.style.display = 'none'
        }, 3000)
    } else {
        msg.style.display = 'none'
        window.location.href = "main.html"
    }
}

function validateForm() {
    validatePassword()
}

function validatePassword() {
    var password = document.getElementById("pass1Field");
    var confirm_password = document.getElementById("pass2Field");
    if (password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Passwords Don't Match");
    } else {
        confirm_password.setCustomValidity("");
    }
    return password.value == confirm_password.value
}
