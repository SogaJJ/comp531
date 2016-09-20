
function extractForm() {
	console.log('extractForm')
	var query = window.location.search.replace('?','').split('&')
	query.forEach(function(item){
		var pair = item.split('=')
		console.log('query')
		if (pair[0] == "accountName") {
			document.getElementById('main_page_name').innerHTML = pair[1]
		}
	})
}

function uploadImg() {
	document.getElementById('upload_img').click()
}

function postStatus() {
	var oldPost = document.getElementById('oldPost')
	var newPost = document.getElementById('newPost')
	oldPost.innerHTML = newPost.value
	newPost.value = ""
}
