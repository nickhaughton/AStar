var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var blockContainer =[[]];

var cWidth = 800;
var cHeight = 450;
var bWidth = 10;
var bHeight = 10;

var expandDirection = {
	down:1,
	up:2,
	left: 3,
	right: 4
}

var block = {
	type: "Path",
	color: "green",
	width: bWidth,
	height: bHeight,
	draw: function(xPos, yPos){
		ctx.fillStyle = "black";
		ctx.fillRect(xPos, yPos, this.width, this.height);
		ctx.fillStyle = this.color;
		ctx.fillRect(xPos, yPos, this.width - 1, this.height -1);
	}
}

function fillBlockContainer(){
for (var i = 0; i <= cWidth/bWidth; i++) {
	blockContainer[i] = [];
}
}


function createAllBlocks(){
	fillBlockContainer();
var startCreated = false;
var randomStartY = Math.floor(Math.random() * (cHeight/bHeight));

for (var i = 0; i <= cWidth/bWidth; i++) {
	for (var j = 0; j <= cHeight/bHeight; j++) {
		var tempBlock = Object.create(block);
		if(!startCreated && i === 0 && j === randomStartY){
			tempBlock.type = "start";
			tempBlock.color = "yellow"
		}
		blockContainer[i][j] = tempBlock;
	};
};
}


function drawAllBlocks(){
	for (var i = 0; i <= cWidth/bWidth; i++) {
	for (var j = 0; j <= cHeight/bHeight; j++) {
		blockContainer[i][j].draw(i*bWidth, j*bHeight);
	};
};
}

function randomRBG(){
	return "rgb("+ Math.floor((Math.random() * 256)) + ", " + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256))+")";
}


function generateBaracade(numBlocks){
//find random node to start the block generation on
var style = expandDirection.down;
var randomStartX;

console.log();


}

function getRandomBaracadeCoordinate(){
	var choiceSeed = Math.floor((Math.random() * 2));
	console.log(choiceSeed);

}

function getRandomStartCoordinate(){

}

function generateRandomBaracades(numBaracades, maxBlocksPerBaracade){
	for (var i = 0; i < numBaracades; i++) {
		var numBaracadeBlocks = Math.floor((Math.random() * maxBlocksPerBaracade) + 1)
		generateBaracade(numBaracadeBlocks);
	};
}

createAllBlocks();
generateRandomBaracades(10, 10);
drawAllBlocks();


