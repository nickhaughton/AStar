var currentParentNode;
var targetNode;
var potNodes = new Array();
var visitedNodes = new Array();
var minFScore = Infinity;

function node(parent, block) {
    this.block = block;
    this.parent = parent;
    this.fScore = null;
}

function pathFind() {
    //Find the possible nodes
    var nodes = findNodes(currentParentNode);
    //Calculate the F scores

    for (var i = 0; i < nodes.length; i++) {
        nodes[i].fScore = calculateFScore(nodes[i]);
        minFScore = Math.min(minFScore, nodes[i].fScore);
    };
    for (var i = 0; i < nodes.length; i++) {
       var dif = Math.abs(nodes[i].fScore -minFScore);

       if(dif <= 10){
nodes[i].block.color = "pink";
       }else 
       if(dif <= 20){
nodes[i].block.color = "rgba(25, 255, 125, 1)";

       }else 
      {
nodes[i].block.color = "rgba(25, 40, 255, 1)";

       }
    };

    //Choose the next node
    var nextNode = nodes.filter(minFScoreNode)[0];
    console.log(nodes.length);
    console.log(nodes.filter(minFScoreNode).length);
    console.log(minFScore);
    console.log(nodes.filter(minFScoreNode));
    //Move there
    moveToNode(nextNode);
}

function moveToNode(node) {
    console.log(node);
    node.block.color = "yellow";
    node.parent.block.color = "green";
    node.parent.parent = null;
    currentParentNode = node;
    resetVariables();
    drawAllBlocks();
}

function resetVariables() {
    var minFScore = Infinity;
}

function calculateFScore(node) {
    var gScore; //movement cost
    var hScore; //estimated total movement cost, Manhattan method 
    hScore = (Math.abs(targetNode.block.coordinate.x - node.block.coordinate.x) * 10) + (Math.abs(targetNode.block.coordinate.y - node.block.coordinate.y) * 10);

    //first get parent's gScore
    if (node.block.parent == null || typeof node.block.parent == "undefined") {
        gScore = 0;
    } else {
        gScore = node.block.parent.fScore != null ? node.block.parent : 0;
    }
    //second find movement cost of the next potential node
    if (Math.abs(node.block.coordinate.x - node.parent.block.coordinate.x) > 0 && Math.abs(node.block.coordinate.y - node.parent.block.coordinate.y) > 0) {
        gScore += 14;
    } else {
        gScore += 10;
    }

    return gScore + hScore;
}


function findNodes(parentNode) {
    tempNodes = new Array();
    console.log(parentNode);
    currentCoordinate = parentNode.block.coordinate;
    //finding all nodes surrounding parentNode
    validXRight = parentNode.block.coordinate.x + 1 <= xBlocks;
    validXLeft = parentNode.block.coordinate.x - 1 >= 0;

    validYUp = parentNode.block.coordinate.y + 1 <= yBlocks;
    validYDown = parentNode.block.coordinate.y - 1 >= 0;

    //This is stupid, must be a better way
    if (validXRight) {
        tempNodes.push(new node(parentNode, blockContainer[parentNode.block.coordinate.x + 1][parentNode.block.coordinate.y]));
    }
    if (validXRight && validYUp) {
        tempNodes.push(new node(parentNode, blockContainer[parentNode.block.coordinate.x + 1][parentNode.block.coordinate.y + 1]));
    }
    if (validXRight && validYDown) {
        tempNodes.push(new node(parentNode, blockContainer[parentNode.block.coordinate.x + 1][parentNode.block.coordinate.y - 1]));
    }
    if (validYUp) {
        tempNodes.push(new node(parentNode, blockContainer[parentNode.block.coordinate.x][parentNode.block.coordinate.y + 1]));
    }
    if (validYDown) {
        tempNodes.push(new node(parentNode, blockContainer[parentNode.block.coordinate.x][parentNode.block.coordinate.y - 1]));
    }
    if (validXLeft) {
        tempNodes.push(new node(parentNode, blockContainer[parentNode.block.coordinate.x - 1][parentNode.block.coordinate.y]));
    }
    if (validXLeft && validYUp) {
        tempNodes.push(new node(parentNode, blockContainer[parentNode.block.coordinate.x - 1][parentNode.block.coordinate.y + 1]));
    }
    if (validXLeft && validYDown) {
        tempNodes.push(new node(parentNode, blockContainer[parentNode.block.coordinate.x - 1][parentNode.block.coordinate.y - 1]));
    }

    return tempNodes.filter(validNode);
}

function validNode(node) {
    //check that the node isn't on illegal terrain and hasn't been visited
    var hasBeenVisited = false;
    for (var i in visitedNodes.length) {
        if (node.block.coordinate == i.block.coordinate && !hasBeenVisited) {
            hasBeenVisited = true;
        }
    };
    return (!node.block.illegalTerrain && !hasBeenVisited);
}

function minFScoreNode(node) {
    return node.fScore === minFScore;
}