
var imageCandidatesList = ["image/image0.jpg", "image/image1.jpg", "image/image2.jpg"]
var BtnToImageHash = {}
var BtnToIntervalHash = {}
var STOP = "stop"
var RESUME = "resume"

function init() {
	console.log("init() has been called")
	var imageTagList = document.getElementsByClassName("image")
	for (var i = 0; i < imageTagList.length; i++) {
		BtnToImageHash["btn_" + imageTagList[i].id] = imageTagList[i]
		;(function(){
			var imageObject = new image(imageTagList[i])
			var interval = setInterval(function(){imageObject.iterator()}, Math.floor((Math.random() * 5) + 1) * 1000)
			BtnToIntervalHash["btn_" + imageTagList[i].id] = interval
		})()
	}
}

function image(imageObject) {
	this.count = 0
	this.imageObject = imageObject
	this.iterator = function() {
		imageObject.src = imageCandidatesList[this.count]
		this.count = (this.count + 1) % 3
	}
}

function change(id) {
	var btn = document.getElementById(id)
	if (btn.value == STOP) {
		clearInterval(BtnToIntervalHash[id])
		btn.value = RESUME
	} else {
		;(function(){
			var imageObject = new image(BtnToImageHash[id])
			var interval = setInterval(function(){imageObject.iterator()}, Math.floor((Math.random() * 5) + 1) * 1000)
			BtnToIntervalHash[id] = interval
		})()		
		btn.value = STOP
	}
}
