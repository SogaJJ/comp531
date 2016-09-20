function login() {
    var username = document.getElementById('username')
    var password = document.getElementById('password');
    var msg = document.getElementById('index_msg')
    if (username.value == "" || password.value == ""){
        msg.style.display = 'inline'
    } else {
        msg.style.display = 'none'
        window.location.href = "main.html"
    }
}
