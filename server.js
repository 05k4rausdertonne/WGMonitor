var request = require('request');

var font = requre('./pixelfont.js')

const

var colorPalette = ["ff71ce", "01cdfe", "b967ff", "fffb96", "05ffa1"];

const clockOffsets = [3, 1, 4, 9, 12, 7]

var frameBuffer = Array(16).fill(Array(16).fill(0));

var frameJson = {frame : Array(256).fill(0)};

const url = "192.168.2.143/setframe"

var dotsOn = 0;

exports.serverInit = function() {

}

exports.serverLoop = function() {

    fillClock();

    sendFrame();

    //dotsOn = (dotsOn + 1) % 2;
}

async function sendFrame() {

    var options = {
        uri: 'http://192.168.2.147/setframe',
        method: 'POST',
        body: JSON.stringify(frameJson)  
    };

    request(options, function (error, response, body) {
    });
}

function fillClock() {
    var date = new Date();

    var clockDigits = [];
    clockDigits.push(Math.floor(date.getHours() / 10));
    clockDigits.push(date.getHours() % 10);
    clockDigits.push(Math.floor(date.getMinutes() / 10));
    clockDigits.push(date.getMinutes() % 10);

    for(var k = 0; k < 4; k++) {
        for(var i = 0; i < 3; i++) {
            for(var j = 0; j < 5; j++) {
                frameJson.frame[(j + clockOffsets[0]) * 16 + i + clockOffsets[k + 1]] = 
                    Digits[clockDigits[k]][j][i] * parseInt(colorPalette[k], 16);
            }
        }
    }

    for(var i = 0; i < 2; i++) {
        for(var j = 0; j < 5; j++) {
            frameJson.frame[(j + clockOffsets[0]) * 16 + i + clockOffsets[5]] = 
                dots[j][i] * parseInt(colorPalette[4], 16) * dotsOn;
        }
    }
}
