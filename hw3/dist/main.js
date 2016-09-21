function assignTime (){
	var els = document.getElementsByClassName("postedTime");
	[].forEach.call(els, function (el) {
		var d = new Date()
		el.innerHTML = d
	});
}

function extractForm() {
	var query = window.location.search.replace('?','').split('&')
	query.forEach(function(item){
		var pair = item.split('=')
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
