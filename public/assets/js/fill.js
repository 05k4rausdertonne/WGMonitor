const maxDepartures = new Object({"Alaunplatz": 4, "Bischofsweg": 8, "Hans-Oster-Strasse": 4});

function fillDepartureTable(station, departures) {

    let table = document.getElementById(station);
    let tbody = table.getElementsByTagName("TBODY")[0];

    clearNode(tbody);

    let row;
    let cell;

    for (i = 0; i < maxDepartures[station] && i < departures.length; i++) {

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
        + padTwo(dateTime.getMonth() + 1) + "." + dateTime.getFullYear();

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
    let imgTitle = document.getElementById("memeCaption");

    outerLoop:
    for (i = 0; i < items.length; i++) {

        if(!items[i].is_album) {

            if(items[i].type.includes("image/")) {

                imgURL = items[i].link;
                
                imgTitle.appendChild(document.createTextNode(items[i].title));             
                break outerLoop;
            }

        } else {

            for (j = 0; j < items[i].images.length; j++) {
                        
                        if(items[i].images[j].type.includes("image/")) {

                            imgTitle.appendChild(document.createTextNode(items[i].title));
                            imgURL = items[i].images[j].link;                
                            break outerLoop;
                        }
            }

        }

        
    }

    imgElement.src = imgURL;

    

}

