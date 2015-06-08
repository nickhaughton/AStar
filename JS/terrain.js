var blockContainer = [
    []
];
var cWidth = 800;
var cHeight = 450;
var bWidth = 10;
var bHeight = 10;

var xBlocks = (cWidth / bWidth) - 1;
var yBlocks = (cHeight / bHeight) - 1;

var expandDirection = {
    down: -1,
    up: 1,
    left: -1,
    right: 1
};

var block = {
    type: "path",
    color: "green",
    width: bWidth,
    illegalTerrain: false,
    height: bHeight,
    coordinate: null,
    draw: function(xPos, yPos) {
        ctx.fillStyle = "black";
        ctx.fillRect(xPos, yPos, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fillRect(xPos, yPos, this.width - 1, this.height - 1);
    }
};

function coordinate(x, y) {
    this.x = x,
    this.y = y
}

function fillBlockContainer() {
    for (var i = 0; i <= xBlocks; i++) {
        blockContainer[i] = [];
    }
}

function createAllBlocks() {
    fillBlockContainer();
    var startCreated = false;
    var randomStartY = Math.floor(Math.random() * yBlocks);

    for (var i = 0; i <= xBlocks; i++) {
        for (var j = 0; j <= yBlocks; j++) {
            var tempBlock = Object.create(block);
            tempBlock.coordinate = new coordinate(i, j);
            blockContainer[i][j] = tempBlock;
        };
    };
    createStartBlock();
    createObjectiveBlock();
    generateRandomBaracades(10, 30);
}

function createStartBlock() {
    var coordinate = getRandomStartCoordinate();
    var tempBlock = Object.create(block);
    tempBlock.type = "start";
    tempBlock.color = "yellow";
    tempBlock.coordinate = coordinate;

    blockContainer[coordinate.x][coordinate.y] = tempBlock;

    currentParentNode = new node(null, tempBlock);
}

function createObjectiveBlock() {
    var coordinate = getRandomObjectiveCoordinate();
    var tempBlock = Object.create(block);
    tempBlock.type = "objective";
    tempBlock.color = "red";
    tempBlock.coordinate = coordinate;
    blockContainer[coordinate.x][coordinate.y] = tempBlock;
    targetNode = new node(null, tempBlock);
}


function drawAllBlocks() {
    for (var i = 0; i <= xBlocks; i++) {
        for (var j = 0; j <= yBlocks; j++) {
            blockContainer[i][j].draw(i * bWidth, j * bHeight);
        };
    };
}

function randomRBG() {
    return "rgb(" + Math.floor((Math.random() * 256)) + ", " + Math.floor((Math.random() * 256)) + "," + Math.floor((Math.random() * 256)) + ")";
}


function generateBaracade(numBlocks) {
    var seedCoordinate = getRandomBaracadeCoordinate();
    var xStyle = expandDirection.down;
    var yStyle = expandDirection.right;
    var xNumBlocks = findRandomFactor(numBlocks);
    var yNumBlocks = numBlocks / xNumBlocks;

    //figure out which way to expand the blocks
    if (seedCoordinate.x + xNumBlocks > xBlocks) {
        xStyle = expandDirection.left;
    } else {
        xStyle = expandDirection.right;
    }
    if (seedCoordinate.y + yNumBlocks > yBlocks) {
        yStyle = expandDirection.down;
    } else {
        yStyle = expandDirection.up;
    }

    for (var i = 0; i <= xNumBlocks - 1; i++) {
        for (var j = 0; j <= yNumBlocks - 1; j++) {
            var tempBlock = Object.create(block);
            tempBlock.type = "obstruction";
            tempBlock.color = "grey";
            tempBlock.illegalTerrain = true;
            tempBlock.coordinate = new coordinate(seedCoordinate.x + (i * xStyle), seedCoordinate.y + (j * yStyle));
            blockContainer[seedCoordinate.x + (i * xStyle)][seedCoordinate.y + (j * yStyle)] = tempBlock;
        };
    };
}

function getRandomBaracadeCoordinate() {
    var x = Math.floor((Math.random() * (xBlocks)));
    var y = Math.floor((Math.random() * (yBlocks)));
    return new coordinate(x, y);
}

function getRandomStartCoordinate() {
    var x = 0;
    var y = Math.floor((Math.random() * (yBlocks)));
    return new coordinate(x, y);
}

function getRandomObjectiveCoordinate() {
    var x = xBlocks;
    var y = Math.floor((Math.random() * (yBlocks)));
    return new coordinate(x, y);
}

function generateRandomBaracades(numBaracades, maxBlocksPerBaracade) {
    for (var i = 0; i < numBaracades; i++) {
        generateBaracade(maxBlocksPerBaracade);
    };
}

function findRandomFactor(number) {
    var factors = new Array();
    var inc = 1;
    //if odd
    if (number % 2 != 0) {
        inc = 2;
    }
    for (var i = 0; i <= (number / 2); i += inc) {
        if (number % i === 0) {
            factors.push(i);
        }
    }
    return factors[Math.floor(Math.random() * factors.length)];
}

function findBlockAtPixle(xPixle, yPixle) {
    return blockContainer[Math.floor(xPixle / bWidth)][Math.floor(yPixle / bHeight)];
}