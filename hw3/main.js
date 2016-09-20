
var imageCandidatesList = ["image/image0.jpg", "image/image1.jpg", "image/image2.jpg"]
var BtnToImageHash = {}
var BtnToIntervalHash = {}
var STOP = "stop"
var RESUME = "resume"

// initialization by mapping btn to image
function init() {
	console.log("init() has been called")
	var imageTagList = document.getElementsByClassName("image")
	Array.prototype.forEach.call(imageTagList, function(individualImage) {
		BtnToImageHash["btn_" + individualImage.id] = individualImage
		;(function(){
			var imageObject = new image(individualImage)
			var interval = setInterval(function(){imageObject.iterator()}, 
					Math.floor((Math.random() * 5) + 1) * 1000)
			BtnToIntervalHash["btn_" + individualImage.id] = interval
		})()
	});
}

// wrap the image object to include count number in the image list and imgae iterator
function image(imageObject) {
	this.count = 0
	this.imageObject = imageObject
	this.iterator = function() {
		imageObject.src = imageCandidatesList[this.count]
		this.count = (this.count + 1) % 3
	}
}

// button function to change status of the image
function change(id) {
	var btn = document.getElementById(id)
	if (btn.value == STOP) {
		clearInterval(BtnToIntervalHash[id])
		btn.value = RESUME
	} else {
		;(function(){
			var imageObject = new image(BtnToImageHash[id])
			var interval = setInterval(function(){imageObject.iterator()}, 
					Math.floor((Math.random() * 5) + 1) * 1000)
			BtnToIntervalHash[id] = interval
		})()		
		btn.value = STOP
	}
}
