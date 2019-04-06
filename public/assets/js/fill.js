const maxDepartures = 8

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

    switch (dateTime.getDay()) {

        case 1:
            dateString = "Montag, ";
            break;
            
        case 2:
            dateString = "Dienstag, ";
            break;

        case 3:
            dateString = "Mittwoch, ";
            break;

        case 4:
            dateString = "Donnerstag, ";
            break;

        case 5:
            dateString = "Freitag, ";
            break;

        case 6:
            dateString = "Samstag, ";
            break;

        case 0:
            dateString = "Sonntag, ";
            break;

    }
    dateString = dateString + " " + padTwo(dateTime.getDate()) + "." 
        + padTwo(dateTime.getMonth()) + "." + padTwo(dateTime.getYear());

    clockString = padTwo(dateTime.getHours()) + ":" 
        + padTwo(dateTime.getMinutes()) + ":" + padTwo(dateTime.getSeconds());
    
    let dateText = document.createTextNode(dateString);
    let clockText = document.createTextNode(clockString); 

    date.appendChild(dateText);
    clock.appendChild(clockText);
    
}

function fillMeme(data) {

    let items = data.items;
    let imgURL = "";
    let imgElement = document.getElementById("memeOfTheDay");

    outerLoop:
    for (i = 0; i < items.length; i++) {

        for (j = 0; j < items[i].images.length; j++) {
            
            if(items[i].images[j].link.includes(".png") 
                || items[i].images[j].link.includes(".jpg")) {

                imgURL = items[i].images[j].link;                
                break outerLoop;
            }
        }
    }

    console.log(imgURL);

    imgElement.src = imgURL;

    

}

