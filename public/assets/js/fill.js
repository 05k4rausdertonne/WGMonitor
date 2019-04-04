const maxDepartures = 10

function fillDepartureTable(station, departures) {

    let table = document.getElementById(station);
    let tbody = table.getElementsByTagName("TBODY")[0];

    while(tbody.firstChild){
        tbody.removeChild(tbody.firstChild);
    }

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

