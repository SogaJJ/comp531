'use strict'
var fishTypeList = ["nemo", "nemo", "dory", "shark", "dory", "yTang","yTang",  "turtle", "btfly", "btfly"]
var gameTicker
var app
var timer
var launch = function() {
	console.log('asdf')
	var canvas = document.querySelector("canvas")
	app = createApp(canvas)
	canvas.addEventListener("mousedown", app.cast, false)
	app.start()
	timer = setInterval(tickTimer, 1000)
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
	app.stop();
	clearInterval(timer)
	document.getElementById('timer').innerHTML = 60
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
		console.log('stop clicked')
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
				var num = parseInt(document.getElementById(fish.type+"-catch").innerHTML)
				document.getElementById(fish.type+"-catch").innerHTML = num + 1				
			}

		})
		var numberOfFishCatch = fishes.length - nextfishes.length
		document.getElementById('msg').innerHTML = 'catch ' + numberOfFishCatch + ' fishes'
		
		var medalType = ['bronze', 'silver', 'gold']
		var medal
		if (numberOfFishCatch >= 3) {
			if (numberOfFishCatch > 5) {
				medal = medalType[2]
			} else {
				medal = medalType[numberOfFishCatch - 3]
			}
			console.log('should earn a' + medal)
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

