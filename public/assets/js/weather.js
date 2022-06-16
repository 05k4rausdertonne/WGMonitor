const WEATHER_API_KEY = "bfc13cb09e9587a89f7fc440a020963f";
const MAX_CHART_VALUES = 10;
const CHART_OTIONS = {
    showArea: false,
    showLine: true,
    showPoint: false,
    width: "500px",
    fullWidth: true,
    axisX: {
      showGrid: false
    }
}

const tempThresholds = [-10, -5, 0, 5, 10, 15, 20, 25, 30, 500];

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

    data = {labels: [], series: []}

    tempThresholds.forEach(e => {
        data.series.push([]);
    });

    let temps = [];

    for (i = 0; i < MAX_CHART_VALUES*2 && i < forecast.list.length*2; i++) {
        if (i % 2) {

            temps.push(kelvinToCelsius((forecast.list[(i+1)/2].main.temp + forecast.list[(i-1)/2].main.temp) / 2));
            data.labels.push("");
        } else {

            temps.push(kelvinToCelsius(forecast.list[i/2].main.temp));
            data.labels.push(timestampToTime(forecast.list[i/2].dt))
        }
    }
    temps.pop();

    let lastTempSegment;

    for(i = 0; i < temps.length; i++) {
        
        let tempSegment = 0;

        tempThresholds.forEach((e, j) => {
            data.series[j].push(null);

            if (temps[i] > e) {
                tempSegment = j+1;
            }
        });


        if (i == 0) {
            lastTempSegment = tempSegment;
        }

        // console.log("threshold " + tempSegment + " for temp " + temps[i]);

        data.series[tempSegment][i] = temps[i];
        
        if (tempSegment < lastTempSegment && i>0) {
            if (temps[i - 1] - tempThresholds[tempSegment] < 
                tempThresholds[tempSegment] - temps[i]) {

                    data.series[tempSegment][i - 1] = temps[i - 1];

            } else {
                data.series[lastTempSegment][i] = temps[i];
            }
        }

        if (tempSegment > lastTempSegment && i>0) {
            if (tempThresholds[lastTempSegment] - temps[i - 1] > 
                temps[i] - tempThresholds[lastTempSegment]) {

                    data.series[lastTempSegment][i] = temps[i];

            } else {
                data.series[tempSegment][i - 1] = temps[i - 1];
            }
        }

        lastTempSegment = tempSegment;
            
    }


    console.log(data);

    new Chartist.Line(tag, data, CHART_OTIONS);
}