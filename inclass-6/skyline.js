'use strict'

var createApp = function(canvas) { 
	var c = canvas.getContext("2d");

	// Create the ground
	var floor = canvas.height/2
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")
	c.fillStyle=grad
	c.fillRect(0, floor, canvas.width, canvas.height)

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'] 

	// list of buildings
	var buildings = []

	// paint the building
	var paintBuilding = function (building) {
		c.fillStyle= building.color
		c.fillRect(building.xPosition, floor - building.height, building.width, building.height)
		c.fillStyle="yellow"
		for (var y = floor - floorSpacing; y > floor - building.height; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < building.width - windowWidth; x += windowSpacing + windowWidth) {
				c.fillStyle = Math.random() > 0.5 ? "yellow" : "black"
				c.fillRect(building.xPosition + x, y - windowHeight, windowWidth, windowHeight)
			}
		}
	}

	//build a building
	var build = function() { 
		var x0 = Math.random()*canvas.width
		var blgWidth = (windowWidth+windowSpacing) * Math.floor(Math.random()*10)
		var blgHeight = Math.random()*canvas.height/2
		var building = {
			xPosition:x0, height:blgHeight, width:blgWidth, 
			color:blgColors[Math.floor(Math.random()*blgColors.length)]
		}
		buildings.push(building)
		paintBuilding(building)
	}

	var sun = {x: 10, y: 200, r: 20, t: 3}
	var moveSun = function() {
		// erase previous sun
		c.fillStyle = "white"
		c.beginPath()
		c.arc(sun.x, sun.y, sun.r * 1.5, 0, 2*Math.PI, false)
  		c.closePath()
  		c.fill()
  		// move the sun
  		sun.x += 3
  		if (sun.x > canvas.width) {
  			sun.x = 0
  		}
  		// repaint the sun
  		c.fillStyle = "#FCD440"
		c.beginPath()
		c.arc(sun.x, sun.y, sun.r, 0, 2*Math.PI, false)
  		c.closePath()
  		c.fill()
  		buildings.forEach(function(building) {
  			paintBuilding(building)
  		})
	}

	var carPositionX = 0, carHeight = 15, carWidth = 40, carOffset = 10
	function moveCar() {
		// erase previous car
		c.fillStyle="white"
		c.fillRect(carPositionX, floor - carHeight - carOffset, carWidth, carHeight)
		c.beginPath()
		c.arc(carPositionX + 10, floor - carHeight - carOffset + 15, 9, 0, 2*Math.PI, false)
  		c.closePath()
  		c.fill()
  		c.beginPath()
		c.arc(carPositionX + 30, floor - carHeight - carOffset + 15, 9, 0, 2*Math.PI, false)
  		c.closePath()
  		c.fill()
		// move out of edge
		carPositionX += 4
		if (carPositionX > canvas.width) { 
			carPositionX = 0
		}
		// paint the car
		c.fillStyle = "black";
		c.fillRect(carPositionX, floor - carHeight - carOffset, carWidth, carHeight)
		c.beginPath()
		c.arc(carPositionX + 10, floor - carHeight - carOffset + 15, 8, 0, 2*Math.PI, false)
  		c.closePath()
  		c.fill()
  		c.beginPath()
		c.arc(carPositionX + 30, floor - carHeight - carOffset + 15, 8, 0, 2*Math.PI, false)
  		c.closePath()
  		c.fill()
  		c.fillStyle = "#4B0082";
		c.fillRect(carPositionX, floor - carHeight - carOffset, carWidth, carHeight)
	}	

	// grow the building and then repaint that one
	var growTall = function() {
		var x = event.layerX + canvas.offsetLeft
		var y = event.layerY + canvas.offsetTop
		buildings.forEach(function(building) { 
			if (building.xPosition < x && x < building.xPosition + building.width &&
				floor - building.height < y && y < floor) {	
				building.height += windowHeight + floorSpacing	
				paintBuilding(building)
			}
		})	
	}

	// start the app
	var start = function() {
		setTimeout(start, 50)
		moveSun()
		moveCar()
	}

	return {
		build: build,
		growTall: growTall,
		start: start
	}
}

window.onload = function() {
	var canvas = document.querySelector("canvas")
	var app = createApp(canvas)
	canvas.addEventListener("mousedown", app.growTall, false)
	document.getElementById("build").onclick = app.build
	app.start()
}


