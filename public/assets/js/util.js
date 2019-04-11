var timeOffset = 0;
const weatherApiKey = "bfc13cb09e9587a89f7fc440a020963f";


async function getDepartureDataDVB(station) {

    let res = await fetch('http://widgets.vvo-online.de/abfahrtsmonitor/Abfahrten.do?ort=Dresden&hst=' 
        + station + '&vz=0&lim=15');
    let data = await res.json();


    fillDepartureTable(station, data);       
}

async function getTimeOffset(timezoneID) {

    let res = await fetch("http://worldclockapi.com/api/json/" + timezoneID + "/now");
    let data = await res.json();

    timeOffset = Math.round(Date.now() - fileTimeToUnixMs(data.currentFileTime) + 3600000);
    
    if (data.isDayLightSavingsTime) timeOffset += 3600000;
}

function getDateTime() {
    return new Date(Date.now() - timeOffset);
}


function refreshDepartureTables(){

    let departureTables = document.getElementsByClassName("departures");

    for(i = 0; i < departureTables.length; i++) {
        getDepartureDataDVB(departureTables[i].id);
    }
}

window.addEventListener("load", function(event) {

    refreshDepartureTables();
    
    setInterval(refreshDepartureTables, 10000);
    
    fillTimeWidgets();
    
    setInterval(fillTimeWidgets, 1000);

    setInterval(getMemeData(), 3600000)
});

setInterval(getTimeOffset("cet"), 86400000);

function fileTimeToUnixMs(fileTime) {
    return Math.round((fileTime/10000) - 11644473600000);
}

function padTwo(number) {
    return number >= 10 ? number : "0" + number; 
}

function clearNode(node){

    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }

}

async function getMemeData() {

    let headers = new Headers();
    headers.set('Authorization', "Client-ID a86175adb6181f3");
    
    let res = await fetch("https://api.imgur.com/3/gallery/t/memes/top/day/0", 
        {method:'GET',
        headers: headers});
    let data = await res.json();
    data = data.data;

    fillMeme(data);
}

async function getWeatherData(city) {

    let res = await fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",de&APPID=" + weatherApiKey + "&mode=json");
    let data = await res.json();

    console.log(data);



}

getWeatherData(Dresden);





