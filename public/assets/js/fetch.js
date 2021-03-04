const MEME_SUBREDDITS = ["https://www.reddit.com/r/dankmemes/top.json",
                        "https://www.reddit.com/r/ich_iel/top.json"];

function getMemeData() {
    let selectedSubReddit = MEME_SUBREDDITS[getRandomInt(0, MEME_SUBREDDITS.length - 1)];

    fetch(selectedSubReddit)

        .then(response => response.json())

        .then(jsonResponse => jsonResponse.data.children)

        .then(data => {

        console.log(data);        

        fillMeme(data);
    })
    .catch(error => {

        console.error('Error:', error);

    });
}

async function getWeatherData(city) {

    let res = await fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",de&APPID=" + WEATHER_API_KEY + "&mode=json");
    let forecast = await res.json();

    res = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + ",de&APPID=" + WEATHER_API_KEY + "&mode=json");
    let currentWeather = await res.json();

    fillWeatherWidget(currentWeather, calcDailyWeather(forecast));
    drawWeatherChart(forecast, '.ct-chart-weather');
}

async function getTimeOffset(timezoneID) {

    let res = await fetch("http://worldclockapi.com/api/json/" + timezoneID + "/now");
    let data = await res.json();

    timeOffset = Math.round(Date.now() - fileTimeToUnixMs(data.currentFileTime) + 3600000);
    
    if (data.isDayLightSavingsTime) timeOffset += 3600000;
}

async function getDepartureDataDVB(station) {

    let res = await fetch('http://widgets.vvo-online.de/abfahrtsmonitor/Abfahrten.do?ort=Dresden&hst=' 
        + station + '&vz=0&lim=15');
    let data = await res.json();


    fillDepartureTable(station, data); 
}

async function getInspiroQuote() {

    let res = await fetch('https://inspirobot.me/api?generate=true');
    let url = await res.text();

    console.log(url);

    fillInspiroQuote(url);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}