const MAX_DEPARTURES = new Object({"Wasaplatz": 8, "S-Bahnhof Strehlen": 12});
const MAX_FORECAST_VALUES = 3;
const MAX_IMAGE_RATIO = 1.5 // = height/width

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

function fillMeme(items) {

    let imgItem;
    let imgElement = document.getElementById("memeOfTheDay");
    let imgTitle = document.getElementById("memeCaption");
    let bestVotes = 0;

    items.forEach(element => {
        let item = element.data;
        if( !item.is_video &&
            !item.over_18 &&   
            item.is_reddit_media_domain &&         
            item.preview.images[0].source.height/item.preview.images[0].source.width <= MAX_IMAGE_RATIO &&
            bestVotes < item.score &&
            item.preview.images[0].variants.mp4 ==  undefined) {

                bestVotes = item.score;

                imgItem = item;
            }
    });

    console.log(imgItem.url);
    
    imgTitle.appendChild(document.createTextNode(imgItem.title));

    imgElement.src = imgItem.url;
}

function fillWeatherWidget(currentData, forecastData) {

    let currentWidget = document.getElementById("currentWeather").getElementsByTagName("TH");
    let forecastWidget = document.getElementById("forecast").getElementsByTagName("TR");
    let tabIcon = document.getElementById("tabIcon");
    let iconURL = "http://openweathermap.org/img/wn/" 
    + currentData.weather[0].icon + "@2x.png"
    
    Array.prototype.forEach.call(currentWidget, element => {clearNode(element)});
    Array.prototype.forEach.call(forecastWidget, element => {clearNode(element)});

    currentWidget[0].innerHTML = "<td><img src='" + iconURL + 
    "' alt='" + currentData.weather[0].icon + "'></td>";

    currentWidget[1].innerHTML = "<td>" + Math.round(kelvinToCelsius(currentData.main.temp) * 10) / 10 
        + " °C</td>";
        
    currentWidget[2].innerHTML = "<td>" + "Ø " + Math.round(currentData.wind.speed * 10) / 10 
        + " km/h</td>";

    tabIcon.href = iconURL;

    for(i = 0; i < MAX_FORECAST_VALUES && i < forecastData.length; i++) {

        let date = new Date(forecastData[i].date * 1000);

        let iconCell = document.createElement("td");
        iconCell.innerHTML = "<img src='http://openweathermap.org/img/wn/" 
            + forecastData[i].icon 
            + "d.png' alt='" + forecastData[i].icon  + "d'>";
        forecastWidget[0].appendChild(iconCell);

        let dateCell = document.createElement("td");
        dateCell.innerHTML = getDay(date.getDay());
        forecastWidget[1].appendChild(dateCell);

        let tempCell = document.createElement("td");
        tempCell.innerHTML = Math.round(kelvinToCelsius(forecastData[i].max) * 10) / 10 + " °C";
        forecastWidget[2].appendChild(tempCell);

        let tempminCell = document.createElement("td");
        tempminCell.innerHTML = Math.round(kelvinToCelsius(forecastData[i].min) * 10) / 10 + " °C";
        forecastWidget[3].appendChild(tempminCell);

        let windCell = document.createElement("td");
        windCell.innerHTML = "Ø " + Math.round(forecastData[i].wind * 10) / 10 + " km/h";
        forecastWidget[4].appendChild(windCell);

    }

}

function fillInspiroQuote(url) {

    // document.getElementById("inspiroQuote").src = url;
        
}



