const WEATHER_API_KEY = "bfc13cb09e9587a89f7fc440a020963f";
const MAX_CHART_VALUES = 16;
const CHART_OTIONS = {
    showArea: true,
    showLine: false,
    showPoint: false,
    width: "600px",
    fullWidth: true,
    axisX: {
      showGrid: false
    }
}

function calcDailyWeather(forecast) {
    let date = forecast.list[0].dt_txt.split(" ")[0];
    let min = 1000;
    let max = 0;
    let wind = 0;
    let count = 0;
    let icons = new Object();
    let maxIcon = 0;
    let tempIcon

    let daily = [];
    

    for(i = 0; i < forecast.list.length; i++) {

        if(!(date == forecast.list[i].dt_txt.split(" ")[0])) {
            

            daily.push({
                date : forecast.list[i - 1].dt,
                min : min,
                max : max,
                wind : wind / count,
            });

            Object.keys(icons).forEach(element => { 

                if (icons[element] == maxIcon) {

                    daily[daily.length - 1].icon = element;}             
            });

            date = forecast.list[i].dt_txt.split(" ")[0];
            min = 1000;
            max = 0;
            wind = 0;
            count = 0;
            maxIcon = 0;
            icons = new Object();
        }

        min = Math.min(min, forecast.list[i].main.temp);
        max = Math.max(max, forecast.list[i].main.temp);
        wind += forecast.list[i].wind.speed;
        count ++;

        tempIcon = forecast.list[i].weather[0].icon.slice(0, -1);

        if(tempIcon in icons) {
            icons[tempIcon] ++;

        } else {
            icons[tempIcon] = 1;
        }

        maxIcon = Math.max(maxIcon, icons[tempIcon]);

        date = forecast.list[i].dt_txt.split(" ")[0];
            
    }

    return daily;
}

function drawWeatherChart(forecast, tag) {

    data = {labels: [], series: [[], []]}

    for(i = 0; i < MAX_CHART_VALUES && i < forecast.list.length; i++) {

        data.labels[i] = timestampToTime(forecast.list[i].dt);
        data.series[0][i] = kelvinToCelsius(forecast.list[i].main.temp);
    }

    data.labels.pop();

    new Chartist.Line(tag, data, CHART_OTIONS);
}