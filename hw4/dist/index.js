'use strict'
var fishTypeList = ["nemo", "nemo", "dory", "shark", "dory", "yTang","yTang",  "turtle", "btfly", "btfly"]
var medalType = ['bronze', 'silver', 'gold']
var gameTicker
var app
var timer
var points = 0
var targetPoint = 500
var launch = function() {
	reset()
	var canvas = document.querySelector("canvas")
	app = createApp(canvas)
	canvas.addEventListener("mousedown", app.cast, false)
	app.start()
	timer = setInterval(tickTimer, 1000)
	points = 0
}
var reset = function() {
	document.getElementById('winBox').style.display = 'none'
	points = 0
	document.getElementById('odometer').innerHTML = points
	fishTypeList.forEach(function(fish){
		document.getElementById(fish+"-catch").innerHTML = 0
		document.getElementById(fish+"-catch-show").innerHTML = 0
	})
	medalType.forEach(function(medal){
		document.getElementById(medal + "-num").innerHTML = 0
		document.getElementById(medal + '-box').style.display = 'none'
	})
	var temporary = ["nemo", "dory", "yTang", "btfly"]
	temporary.forEach(function(fish){
		document.getElementById(fish + "-target").innerHTML = Math.floor((Math.random()+1) * 40)
	})
	document.getElementById("shark-target").innerHTML = Math.floor((Math.random()+1) * 5)
	document.getElementById("turtle-target").innerHTML = Math.floor((Math.random()+1) * 10)
	targetPoint = Math.floor((Math.random()+1) * 500)
	document.getElementById('point-target').innerHTML = targetPoint
}
var tickTimer = function() {
	var time = parseInt(document.getElementById('timer').innerHTML)
	if (time == 1) {
		//window.alert("Time up")
		clearInterval(timer)
		terminate()
	} else {
		document.getElementById('timer').innerHTML = time - 1	
	}
}
var terminate = function() {
	app.stop()
	clearInterval(timer)
	document.getElementById('timer').innerHTML = 60
	checkResult()
}

var checkResult = function() {
	// check points
	var result = 'win'
	if (points < targetPoint) {
		result = 'lose'
	} 
	fishTypeList.forEach(function(fish){
		var num = parseInt(document.getElementById(fish+"-catch").innerHTML)
		var target = parseInt(document.getElementById(fish+"-target").innerHTML)
		if (num < target) {
			result = 'lose'
		}
	})
	if (result == 'win') {
		document.getElementById('winBox').innerHTML = "You WIN! Play another round!"
	} else {
		document.getElementById('winBox').innerHTML = "You LOSE! Play another round!"
	}
	document.getElementById('winBox').style.display = 'inline'
}

var createApp = function(canvas) { 
	
	var c = canvas.getContext("2d")	
	var fishes = []
	var start = function() {
		Array(15).fill(1).forEach(function(key){
			fish()
		})
		gameTicker = setInterval(function(){
			c.clearRect(0, 0, 700, 500)
			Array(15 - fishes.length).fill(1).forEach(function(key){
				fish()
			})	
			fishes.forEach(function(fish){
				paintFish(fish)
			})
		
		}, 120)
		document.getElementById('launchBtn').disabled = true
	}

	var stop = function() {
		if (document.getElementById('launchBtn').disabled = true) {
			clearInterval(gameTicker)
			c.clearRect(0, 0, 700, 500)
			document.getElementById('launchBtn').disabled = false;
		}		
	}

	var cast = function() {
		if (document.getElementById('launchBtn').disabled == false) {
			return
		}
		var x = event.layerX 
		var y = event.layerY 	
		var img = document.getElementById('net')
		c.drawImage(img, x - 130, y - 110, 200, 200)
		var nextfishes = []
		fishes.forEach(function(fish){
			if (fish.positionX > x || fish.positionX < x - 150 ||
				fish.positionY > y || fish.positionY < y - 150) {
				
				nextfishes.push(fish)
			} else {
				if (fish.type == 'turtle') {
					points = points + 5
				} else if (fish.type == 'shark') {
					points = points - 10
				} else if (fish.type == 'btfly') {
					points = points + 3
				} else {
					points = points + 1
				}
				document.getElementById('odometer').innerHTML = points
				var num = parseInt(document.getElementById(fish.type+"-catch").innerHTML)
				document.getElementById(fish.type+"-catch").innerHTML = num + 1	
				document.getElementById(fish.type+"-catch-show").innerHTML = num + 1				
			}

		})
		var numberOfFishCatch = fishes.length - nextfishes.length
		document.getElementById('msg').innerHTML = 'catch ' + numberOfFishCatch + ' fishes'
		
		var medal
		if (numberOfFishCatch >= 3) {
			if (numberOfFishCatch > 5) {
				medal = medalType[2]
			} else {
				medal = medalType[numberOfFishCatch - 3]
			}
			if (medal == 'bronze') {
				points = points + 10
			} else if (medal == 'silver') {
				points = points + 20
			} else if (medal == 'gold') {
				points = points + 30
			}
			document.getElementById('odometer').innerHTML = points
			if (parseInt(document.getElementById(medal + '-num').innerHTML) == 0) {

				document.getElementById(medal + '-box').style.display = 'inline'
			}
			document.getElementById(medal + '-num').innerHTML = 
				 parseInt(document.getElementById(medal + '-num').innerHTML) + 1

		}
		fishes = nextfishes
	}
	
	var paintFish = function(fish) {
		
		c.drawImage(fish.img, fish.positionX, fish.positionY, 100, 60)
		fish.positionX += fish.velocityX
		fish.positionY += fish.velocityY
		if (fish.positionX < 0 || fish.positionX > 700 ||
			fish.positionY < 0 || fish.positionY > 400) {
			fish.positionX = Math.floor(Math.random() * 700)
			fish.positionY = Math.floor(Math.random() * 400)
		}	
	}

	var fish = function() { 
		var fishType = fishTypeList[Math.floor(Math.random() * 10)]
		var fishImg = document.getElementById(fishType)
		var fishPositionX = Math.floor(Math.random() * 700)
		var fishPositionY = Math.floor(Math.random() * 400)
		var fishVelocityX = Math.random() * 20 - 10
		var FishVelocityY = Math.random() * 20 - 10
		var fish = {
			type: fishType,
			img: fishImg,
			positionX: fishPositionX,
			positionY: fishPositionY,
			velocityX: fishVelocityX,
			velocityY: FishVelocityY
		}
		fishes.push(fish)
		paintFish(fish)
	}
	return {
		cast: cast, 
		start: start,
		stop: stop
	}
}

