var timeOffset = 0;


async function getDepartureDataDVB(station) {

    let res = await fetch('http://widgets.vvo-online.de/abfahrtsmonitor/Abfahrten.do?ort=Dresden&hst=' + station + '&vz=0&lim=15');
    let data = await res.json();

    fillDepartureTable(station, data);       
}

async function getTimeOffset(timezoneID) {

    let res = await fetch("http://worldclockapi.com/api/json/" + timezoneID + "/now");
    let data = await res.json();

    timeOffset = Math.round(Date.now() - fileTimeToUnixMs(data.currentFileTime) + 7200000);
    console.log(timeOffset);
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



