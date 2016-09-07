window.onload = function() {
	var CLICK = "click"
	var RESUME = "resume"
	var freeMove = true
	var btn = document.getElementById("clickBtn")
	btn.onmouseover = function(e) {
		if (freeMove && btn.value == CLICK) {
			var positionX = Math.floor((Math.random() * 10) + 1) * 50;
			var positionY = Math.floor((Math.random() * 10) + 1) * 50;
			btn.style.top = positionX+"px";
			btn.style.left = positionY+"px";			
		}
	}
	
	// set the mouse hover event
	document.body.onkeydown = function(e) {
		if (e.keyCode == 13) {
			e.preventDefault()
			return false
		}
		if (e.keyCode == 16) {
			freeMove = false
		}			
	}

	document.body.onkeyup = function(e) {
		freeMove = true	
	}

	btn.onclick = function() {
		if (btn.value == CLICK) {
			console.log("click button clicked")
			btn.value = RESUME
			btn.innerHTML = "Play Again"
			winMsg.style.display = "block"
		} else {
			btn.value = CLICK
			btn.innerHTML = "click me !"	
			winMsg.style.display = "none"		
		}
	}
}


