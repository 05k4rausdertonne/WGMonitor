var timeOffset = 0;

window.addEventListener("load", function(event) {

    refreshDepartureTables();
    
    setInterval(refreshDepartureTables, 10000);
    
    fillTimeWidgets();
    
    setInterval(fillTimeWidgets, 1000);

    getWeatherData("Dresden");

    setInterval(getWeatherData, 600000, "Dresden")

    getMemeData();

    setTimeout(reloadPage, 3600000);
});

setInterval(getTimeOffset, 86400000, "cet");

function getDateTime() {
    return new Date(Date.now() - timeOffset);
}

function refreshDepartureTables(){

    let departureTables = document.getElementsByClassName("departures");

    for(i = 0; i < departureTables.length; i++) {
        getDepartureDataDVB(departureTables[i].id);
    }
}

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

function reloadPage() {window.location.reload(true);}

function kelvinToCelsius(kelvin) {return kelvin - 273.15}

function getDay(day) {

    switch (day) {

        case 1:
            return "Montag";
            
        case 2:
            return "Dienstag";

        case 3:
            return "Mittwoch";

        case 4:
            return"Donnerstag";

        case 5:
            return "Freitag";

        case 6:
            return "Samstag";

        case 0:
            return "Sonntag";

    }
}

function timestampToTime(dt) {
    let tempDate = new Date(dt * 1000);
    return padTwo(tempDate.getHours()) + ":" + padTwo(tempDate.getMinutes());
}





