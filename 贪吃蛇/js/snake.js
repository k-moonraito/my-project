
var content = document.getElementById('content');
var start = document.getElementsByClassName('startbtn')[0];
var snakeMove;
var con = document.getElementsByClassName('conimg')[0];
var close = document.getElementsByClassName('closeimg')[0];
var endScore = document.getElementById('endscore');
this.score = document.getElementById('score');
var startbtn = document.getElementById('leftbtn');
var stopbtn = document.getElementById('stopbtn');
start.onclick = function(){
	start.style.display = 'none';
	init();
}
function setDerict(code){
		switch(code){
			case 37:
			if(this.moveLeft){
				this.direct = 'moveLeft';
				this.moveLeft = false;
				this.moveRight = false;
				this.moveUp = true;
				this.moveDown = true;
			}
			break;
			case 38:
			if(this.moveUp){
				this.direct = 'moveUp';
				this.moveLeft = true;
				this.moveRight = true;
				this.moveUp = false;
				this.moveDown = false;
			}
			break;
			case 39:
			if(this.moveRight){
				this.direct = 'moveRight';
				this.moveLeft = false;
				this.moveRight = false;
				this.moveUp = true;
				this.moveDown = true;
			}
			break;
			case 40:
			if(this.moveDown){
				this.direct = 'moveDown';
				this.moveLeft = true;
				this.moveRight = true;
				this.moveUp = false;
				this.moveDown = false;
			}
			break;
		}
}
function init(){
	//地图
	this.mapW = parseInt(getComputedStyle(content).width);
	this.mapH = parseInt(getComputedStyle(content).height);
	this.mapDiv = content;
	//食物
	this.foodW = 20;
	this.foodH = 20;
	this.foodX = 0;
	this.foodY = 0;
	//蛇
	this.snakeW = 20;
	this.snakeH = 20;
	this.snakeX = 0;
	this.snakeY = 0;
	this.snakeBody = [[3,0,'head'],[2,0,'body'],[1,0,'body']];
	this.len = this.snakeBody;
	//游戏属性
	this.speed = 200;
	this.direct = 'moveRight';
	this.moveLeft = false;
	this.moveRight = false;
	this.moveUp = true;
	this.moveDown =true; 
	this.score.innerHTML = 0;
	startbtn.style.display = 'block';
	
	startGame();
	bindEvent();
}
function startGame(){
	food();
	snake();
	snakeMove = setInterval(function(){
	move();
	if(con.style.display == 'block'){
		clearInterval(snakeMove);
	}
	},speed);
}
function gameOver(){
	removeClass('snake');
	console.log('gameover');
	con.style.display = 'block';
	close.style.display = 'block';
	endscore.style.display = 'block';
	startbtn.style.display = 'none';
	endscore.innerHTML = this.score.innerText;
	removeClass('food');
	removeClass('move');
	closed();
	this.speed = 200;
	this.direct = 'moveRight';
	this.moveLeft = false;
	this.moveRight = false;
	this.moveUp = true;
	this.moveDown =true; 
}
function closed(){
	close.onclick = function(){
	con.style.display = 'none';
	close.style.display = 'none';
	endscore.style.display = 'none';
	start.style.display = 'block';
	}
}
function food(){
	var food = document.createElement('div');
	food.style.width = this.foodW + 'px';
	food.style.height = this.foodH + 'px';
	food.style.position = 'absolute';
	this.foodX = Math.floor(Math.random() * (this.mapW / 20));
	this.foodY = Math.floor(Math.random() * (this.mapH / 20));
	for(i = 0; i < this.snakeBody.length; i++){	
		if((this.foodX * 20 + 'px') != this.snakeBody[i][0] && (this.foodY * 20 + 'px') != this.snakeBody[i][1]){
		food.style.left = this.foodX * 20 + 'px';
		food.style.top = this.foodY * 20 + 'px';
		}
	}
	this.mapDiv.appendChild(food).setAttribute('class','food');
}
function snake(){
	for( i = 0; i < this.snakeBody.length; i++){
		var snake = document.createElement('div');
		snake.style.width = this.snakeW + 'px';
		snake.style.height = this.snakeH + 'px';
		snake.style.position = 'absolute';
		snake.style.left = this.snakeBody[i][0] * 20 + 'px';
		snake.style.top = this.snakeBody[i][1] * 20 + 'px';
		snake.classList.add(this.snakeBody[i][2]);
		this.mapDiv.appendChild(snake).classList.add('snake');
		switch(this.direct){
			case 'moveRight':
			snake.style.transform = 'rotate(0deg)';
			break;
			case 'moveLeft':
			snake.style.transform = 'rotate(180deg)';
			break;
			case 'moveUp':
			snake.style.transform = 'rotate(-90deg)';
			break;
			case 'moveDown':
			snake.style.transform = 'rotate(90deg)';
			break;
		}
		

	}
}
function move(){
	for(var i = this.snakeBody.length - 1;i > 0; i--){
		 this.snakeBody[i][0] = this.snakeBody[i - 1][0];
		 this.snakeBody[i][1] = this.snakeBody[i - 1][1];
	}
	switch(this.direct){
		case 'moveRight':
		this.snakeBody[0][0] += 1;
		break;
		case 'moveLeft':
		this.snakeBody[0][0] -= 1;
		break;
		case 'moveUp':
		this.snakeBody[0][1] -= 1;
		break;
		case 'moveDown':
		this.snakeBody[0][1] += 1;
		break;
	}
	removeClass('snake');
	snake();
	if(this.snakeBody[0][0] == foodX && this.snakeBody[0][1] == foodY){
		var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];
		var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];
		
		switch(this.direct){
			case 'moveRight':
			this.snakeBody.push([snakeEndX + 1,snakeEndY,'body'])
			break;
			case 'moveLeft':
			this.snakeBody.push([snakeEndX - 1,snakeEndY,'body'])
			break;
			case 'moveUp':
			this.snakeBody.push([snakeEndX,snakeEndY - 1,'body'])
			break;
			case 'moveDown':
			this.snakeBody.push([snakeEndX,snakeEndY + 1,'body'])
			break;
		};
		this.score.innerText =parseInt(score.innerText) + 1;
		removeClass('food');
		food();
	}
	if(this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= this.mapW / 20){
		gameOver();
	}
	if(this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= this.mapH / 20){
		gameOver();
	}
	if(this.snakeBody[0][0] == 0 && this.snakeBody[0][1] == 0){
		switch(this.direct){
			case 'moveRight':
			this.snakeBody.push([snakeEndX + 1,snakeEndY,'body']);
			this.score.innerText =parseInt(score.innerText) + 1;
			break;
			case 'moveLeft':
			this.snakeBody.push([snakeEndX - 1,snakeEndY,'body']);
			this.score.innerText =parseInt(score.innerText) + 1;
			break;
			case 'moveUp':
			this.snakeBody.push([snakeEndX,snakeEndY - 1,'body']);
			this.score.innerText =parseInt(score.innerText) + 1;
			break;
			case 'moveDown':
			this.snakeBody.push([snakeEndX,snakeEndY + 1,'body']);
			this.score.innerText =parseInt(score.innerText) + 1;
			break;
		};
		switch(this.direct){
			case 'moveRight':
			this.snakeBody.push([snakeEndX + 1,snakeEndY,'body']);
			this.score.innerText =parseInt(score.innerText) + 1;
			break;
			case 'moveLeft':
			this.snakeBody.push([snakeEndX - 1,snakeEndY,'body']);
			this.score.innerText =parseInt(score.innerText) + 1;
			break;
			case 'moveUp':
			this.snakeBody.push([snakeEndX,snakeEndY - 1,'body']);
			this.score.innerText =parseInt(score.innerText) + 1;
			break;
			case 'moveDown':
			this.snakeBody.push([snakeEndX,snakeEndY + 1,'body']);
			this.score.innerText =parseInt(score.innerText) + 1;
			break;
		};
		switch(this.direct){
			case 'moveRight':
			this.snakeBody.push([snakeEndX + 1,snakeEndY,'body']);
			this.score.innerText =parseInt(score.innerText) + 1;
			break;
			case 'moveLeft':
			this.snakeBody.push([snakeEndX - 1,snakeEndY,'body']);
			this.score.innerText =parseInt(score.innerText) + 1;
			break;
			case 'moveUp':
			this.snakeBody.push([snakeEndX,snakeEndY - 1,'body']);
			this.score.innerText =parseInt(score.innerText) + 1;
			break;
			case 'moveDown':
			this.snakeBody.push([snakeEndX,snakeEndY + 1,'body']);
			this.score.innerText =parseInt(score.innerText) + 1;
			break;
		};	
		switch(this.direct){
			case 'moveRight':
			this.snakeBody.push([snakeEndX + 1,snakeEndY,'body']);
			this.score.innerText =parseInt(score.innerText) + 1;
			break;
			case 'moveLeft':
			this.snakeBody.push([snakeEndX - 1,snakeEndY,'body']);
			this.score.innerText =parseInt(score.innerText) + 1;
			break;
			case 'moveUp':
			this.snakeBody.push([snakeEndX,snakeEndY - 1,'body']);
			this.score.innerText =parseInt(score.innerText) + 1;
			break;
			case 'moveDown':
			this.snakeBody.push([snakeEndX,snakeEndY + 1,'body']);
			this.score.innerText =parseInt(score.innerText) + 1;
			break;
		};	
		switch(this.direct){
			case 'moveRight':
			this.snakeBody.push([snakeEndX + 1,snakeEndY,'body']);
			this.score.innerText =parseInt(score.innerText) + 1;
			break;
			case 'moveLeft':
			this.snakeBody.push([snakeEndX - 1,snakeEndY,'body']);
			this.score.innerText =parseInt(score.innerText) + 1;
			break;
			case 'moveUp':
			this.snakeBody.push([snakeEndX,snakeEndY - 1,'body']);
			this.score.innerText =parseInt(score.innerText) + 1;
			break;
			case 'moveDown':
			this.snakeBody.push([snakeEndX,snakeEndY + 1,'body']);
			this.score.innerText =parseInt(score.innerText) + 1;
			break;
		};	
		switch(this.direct){
			case 'moveRight':
			this.snakeBody.push([snakeEndX + 1,snakeEndY,'body']);
			this.score.innerText =parseInt(score.innerText) + 1;
			break;
			case 'moveLeft':
			this.snakeBody.push([snakeEndX - 1,snakeEndY,'body']);
			this.score.innerText =parseInt(score.innerText) + 1;
			break;
			case 'moveUp':
			this.snakeBody.push([snakeEndX,snakeEndY - 1,'body']);
			this.score.innerText =parseInt(score.innerText) + 1;
			break;
			case 'moveDown':
			this.snakeBody.push([snakeEndX,snakeEndY + 1,'body']);
			this.score.innerText =parseInt(score.innerText) + 1;
			break;
		};		
	}
	for(i = snakeBody.length -1; i > 0; i--){
		if(this.snakeBody[0][0] == this.snakeBody[i][0] && this.snakeBody[0][1] == this.snakeBody[i][1]){
			gameOver();
		}
	}
}
function removeClass(className){
	var ele = document.getElementsByClassName(className);
	while(ele.length > 0){
		ele[0].parentNode.removeChild(ele[0]);
	}
}
function bindEvent(){
	document.onkeydown = function(e){
		var code = e.keyCode;
		setDerict(code);
	}
	startbtn.onclick = function(){
		clearInterval(snakeMove);
		stopbtn.style.display = 'block';
	}
	stopbtn.onclick = function(){
		snakeMove = setInterval(function(){
			move();
			if(con.style.display == 'block'){
				clearInterval(snakeMove);
			}
			},speed);
		startbtn.style.display = 'block';
		stopbtn.style.display = 'none';
	}
}
			
	
	
