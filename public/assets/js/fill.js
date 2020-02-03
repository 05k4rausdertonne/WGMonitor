const MAX_DEPARTURES = new Object({"Alaunplatz": 4, "Bischofsweg": 8, "Hans-Oster-Strasse": 4});
const MAX_FORECAST_VALUES = 8;
//const MAX_IMAGE_RATIO = 1.75 // = height/width
let maxImageRatio = 2;

function fillDepartureTable(station, departures) {

    let table = document.getElementById(station);
    let tbody = table.getElementsByTagName("TBODY")[0];

    clearNode(tbody);

    let row;
    let cell;

    for (i = 0; i < MAX_DEPARTURES[station] && i < departures.length; i++) {

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

    dateString = getDay(dateTime.getDay()) + ", ";

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


    let items = data/*.items*/;
    let imgURL = "";
    let imgElement = document.getElementById("memeOfTheDay");
    let imgTitle = document.getElementById("memeCaption");
    let bestVotes = 0;

    outerLoop:
    for (i = 0; i < items.length; i++) {

        if(!items[i].is_album) {

            if(items[i].type.includes("image/") &&
            items[i].height/items[i].width <= maxImageRatio) {

                if(bestVotes < items[i].score){

                    bestVotes = items[i].score;

                    imgItem = items[i];
                }
            }

        } else {

            // for (j = 0; j < items[i].images.length; j++) {
                        
            //             if(items[i].images[j].type.includes("image/") &&
            //             items[i].images[j].height/items[i].images[j].width <= maxImageRatio) {

            //                 imgTitle.appendChild(document.createTextNode(items[i].title));
            //                 imgURL = items[i].images[j].link;                
            //                 break outerLoop;
            //             }
            // }
        }        
    }
    
    imgTitle.appendChild(document.createTextNode(imgItem.title));

    imgElement.src = imgItem.link;
}

function fillWeatherWidget(currentData, forecastData) {

    let currentWidget = document.getElementById("currentWeather").getElementsByTagName("TR");
    let forecastWidget = document.getElementById("forecast").getElementsByTagName("TR");
    let tabIcon = document.getElementById("tabIcon");
    let iconURL = "http://openweathermap.org/img/wn/" 
    + currentData.weather[0].icon + "@2x.png"
    
    Array.prototype.forEach.call(currentWidget, element => {clearNode(element)});
    Array.prototype.forEach.call(forecastWidget, element => {clearNode(element)});

    currentWidget[0].innerHTML = "</td>" + Math.round(kelvinToCelsius(currentData.main.temp) * 10) / 10 
        + " °C</td>";

    currentWidget[1].innerHTML = "<td><img src='" + iconURL + 
    "' alt='" + currentData.weather[0].icon + "'></td>";
        
    currentWidget[2].innerHTML = "<td>" + Math.round(currentData.wind.speed * 10) / 10 
        + " km/h</td>";

    tabIcon.href = iconURL;

    for(i = 0; i < MAX_FORECAST_VALUES && i < forecastData.length; i++) {

        let date = new Date(forecastData[i].date * 1000);

        let dateCell = document.createElement("td");
        dateCell.innerHTML = getDay(date.getDay());
        forecastWidget[0].appendChild(dateCell);

        let tempCell = document.createElement("td");
        tempCell.innerHTML = Math.round(kelvinToCelsius(forecastData[i].min) * 10) / 10 + " °C <br>bis "
            + Math.round(kelvinToCelsius(forecastData[i].max) * 10) / 10 + " °C";
        forecastWidget[1].appendChild(tempCell);
        
        let iconCell = document.createElement("td");
        iconCell.innerHTML = "<img src='http://openweathermap.org/img/wn/" 
            + forecastData[i].icon 
            + "d.png' alt='" + forecastData[i].icon  + "d'>";
        forecastWidget[2].appendChild(iconCell);

        let windCell = document.createElement("td");
        windCell.innerHTML = "Ø " + Math.round(forecastData[i].wind * 10) / 10 + " km/h";
        forecastWidget[3].appendChild(windCell);

    }

}

function fillInspiroQuote(url) {

    document.getElementById("inspiroQuote").src = url;
        
}



