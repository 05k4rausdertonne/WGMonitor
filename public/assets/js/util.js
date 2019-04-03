
async function getDepartureDataDVB(station) {

    let res = await fetch('http://widgets.vvo-online.de/abfahrtsmonitor/Abfahrten.do?ort=Dresden&hst=' + station + '&vz=0&lim=15');
    let data = await res.json();

    console.log(data.length);

    fillDepartureTable(station, data);
       
}


function refresh(){

    let departureTables = document.getElementsByClassName("departures");
    console.log(document.getElementsByClassName("departures").length);

    for(i = 0; i < departureTables.length; i++) {
        console.log(departureTables[i].id);
        getDepartureDataDVB(departureTables[i].id);
    }
}

//


window.addEventListener("load", function(event) {
    refresh();
    setInterval(refresh, 10000);
});
