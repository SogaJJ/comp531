function login() {
    var username = document.getElementById('username')
    var password = document.getElementById('password');
    if (username.value == "" || password.value == "") {
        window.alert('Fill in Username and Password !')
    } else {
        window.location.href = "main.html"
    }
}
