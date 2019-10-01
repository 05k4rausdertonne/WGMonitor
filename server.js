var request = require('request');

var font = require('./pixelfont.js')

var colorPalette = ["ff71ce", "01cdfe", "b967ff", "fffb96", "05ffa1"];

const offsets = [2, 1, 4, 9, 12, 9, 1]

var timeOffset = 0;

var frameJson = {frame : Array(256).fill(0)};

const url = "http://192.168.2.147/setframe"

const WEATHER_API_KEY = "bfc13cb09e9587a89f7fc440a020963f";

exports.serverInit = function() {

    getTimeOffset("cet");

    getTemp("Dresden");

    setInterval(getTemp, 3600000, "Dresden");

}

exports.serverLoop = function() {

    fillClock();

    sendFrame();

}

async function sendFrame() {

    var options = {
        uri: url,
        method: 'POST',
        body: JSON.stringify(frameJson)
    };

    request(options, function (error, response, body) {
    });
}

function fillClock() {

    var date = getDateTime();

    var clockDigits = [];
    clockDigits.push("" + Math.floor(date.getHours() / 10));
    clockDigits.push("" + date.getHours() % 10);
    clockDigits.push("" + Math.floor(date.getMinutes() / 10));
    clockDigits.push("" + date.getMinutes() % 10);

    clockDigits.forEach((element, index) => {
        drawLetter(element, offsets[index + 1], offsets[0], colorPalette[index]);
    });
}

function fillTemp(myTemp){

    var tempDigits = [];

    if(myTemp < 0) {

        tempDigits.push("min");
        myTemp = Math.abs(myTemp);
    }

    
    if(myTemp > 9) tempDigits.push("" + Math.floor(myTemp / 10));
    tempDigits.push("" + myTemp % 10);
    tempDigits.push("deg");
    tempDigits.push("c");

    tempDigits.forEach((element, index) => {
        drawLetter(element, offsets[6] + (index * font.Width), offsets[5], colorPalette[index]);  
    });
}

function getTemp(city) {
    request("https://api.openweathermap.org/data/2.5/weather?q=" + 
    city + ",de&APPID=" + WEATHER_API_KEY + "&mode=json", function(err, res, body) {
        
        var data = JSON.parse(body);

        var temp = Math.round(data.main.temp - 273.15);

        fillTemp(temp);
    
    });
}

 async function getTimeOffset(timeZoneID) {

    await request("http://worldclockapi.com/api/json/" + timeZoneID + 
    "/now", function(err, res, body) {

        var data = JSON.parse(body);
        timeOffset = Math.round(Date.now() - 
        fileTimeToUnixMs(data.currentFileTime) + 3600000);

        if (data.isDayLightSavingsTime) timeOffset += 3600000;
    });
}

function fileTimeToUnixMs(fileTime) {
    return Math.round((fileTime/10000) - 11644473600000);
}

function getDateTime() {
    return new Date(Date.now() - timeOffset);
}

function drawLetter(name, x, y, color) {

    for(var i = 0; i < font.Width; i++) {
        for(var j = 0; j < font.Height; j++) {
            frameJson.frame[((j + y) * 16) + i + x] = 
                font.Letters[name][j][i] * parseInt(color, 16);
        }
    }
}


