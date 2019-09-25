async function getMemeData() {

    let headers = new Headers();
    headers.set('Authorization', "Client-ID a86175adb6181f3");
    
    let res = await fetch("https://api.imgur.com/3/gallery/t/memes/top/day/0", 
        {method:'GET',
        headers: headers});
    let data = await res.json();
    data = data.data;

    console.log(data)

    fillMeme(data);
}

async function getWeatherData(city) {

    let res = await fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",de&APPID=" + WEATHER_API_KEY + "&mode=json");
    let forecast = await res.json();

    res = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + ",de&APPID=" + WEATHER_API_KEY + "&mode=json");
    let currentWeather = await res.json();

    //console.log(forecast);

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