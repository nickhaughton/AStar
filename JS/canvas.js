var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


window.onload = function() {
    createAllBlocks();
    drawAllBlocks();
    attachEvents();
    var FPS = 5;
    var refIntID = setInterval(function() {
        try {
            pathFind();
        } catch (e) {
            clearInterval(refIntID);
        }
    }, 1000 / FPS);
};