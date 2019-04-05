const maxDepartures = 10

function fillDepartureTable(station, departures) {

    let table = document.getElementById(station);
    let tbody = table.getElementsByTagName("TBODY")[0];

    clearNode(tbody);

    let row;
    let cell;

    for (i = 0; i < maxDepartures && i < departures.length; i++) {

        row = document.createElement("tr");

        for (j = 0; j < 3; j++) {

            cell = document.createElement("td");
            cell.appendChild(document.createTextNode(departures[i][j]))
            row.appendChild(cell);

        }
        tbody.appendChild(row);
    }
}

function fillTimeWidgets(){
    let clock = document.getElementById("clock");
    let date = document.getElementById("date");

    clearNode(clock);
    clearNode(date);

    let dateTime = getDateTime();
    let dateString = "";
    let clockString = "";

    console.log(dateTime);

    switch (dateTime.getDay()) {

        case 1:
            dateString = "Mo";
            break;
            
        case 2:
            dateString = "Di";
            break;

        case 3:
            dateString = "Mi";
            break;

        case 4:
            dateString = "Do";
            break;

        case 5:
            dateString = "Fr";
            break;

        case 6:
            dateString = "Sa";
            break;

        case 0:
            dateString = "So";
            break;

    }
    dateString = dateString + " " + padTwo(dateTime.getDate()) + "." 
        + padTwo(dateTime.getMonth()) + ".";

    clockString = padTwo(dateTime.getHours()) + ":" 
        + padTwo(dateTime.getMinutes()) + ":" + padTwo(dateTime.getSeconds());
    
    let dateText = document.createTextNode(dateString);
    let clockText = document.createTextNode(clockString); 

    date.appendChild(dateText);
    clock.appendChild(clockText);
    
}

