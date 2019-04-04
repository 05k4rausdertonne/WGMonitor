var timeOffset = 0;


async function getDepartureDataDVB(station) {

    let res = await fetch('http://widgets.vvo-online.de/abfahrtsmonitor/Abfahrten.do?ort=Dresden&hst=' + station + '&vz=0&lim=15');
    let data = await res.json();

    fillDepartureTable(station, data);       
}

async function getTimeOffset(timezoneOffset) {

    let res = await fetch("http://worldclockapi.com/api/json/cet/now");
    let data = await res.json();
    console.log(data);
    console.log(new Date().getTime());
    console.log*data.currentFileTime;
    timeOffset = new Date().getTime() - data.currentFileTime;
    console.log(timeOffset);
}


function refresh(){

    let departureTables = document.getElementsByClassName("departures");

    for(i = 0; i < departureTables.length; i++) {
        getDepartureDataDVB(departureTables[i].id);
    }
}

window.addEventListener("load", function(event) {

    refresh();
    setInterval(refresh, 10000);
});

getTimeOffset();
