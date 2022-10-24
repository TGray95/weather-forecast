var currentCity = document.getElementById('current-city');
var currentTemp = document.getElementById("current-temp");
var currentWind = document.getElementById('current-wind');
var currentHumidity = document.getElementById('current-humidity');
var currentUV = document.getElementById('current-uv');
var dailyWeather = document.getElementById('daily-weather');
var historyList = document.getElementById('history');
var dailyIcons = ['icon-day-1', 'icon-day-2', 'icon-day-3', 'icon-day-4', 'icon-day-5']
var dailyDates = ['date-1', 'date-2', 'date-3', 'date-4', 'date-5'];
var dailyTemps = ['temp-1', 'temp-2', 'temp-3', 'temp-4', 'temp-5'];
var dailyWind = ['wind-1', 'wind-2', 'wind-3', 'wind-4', 'wind-5'];
var dailyHumidity = ['hum-1', 'hum-2', 'hum-3', 'hum-4', 'hum-5'];
var citySelection = $('#city-input').val();


function setHistory() {
    var history = currentCity.innerHTML;
    var savedHistory = JSON.parse(localStorage.getItem('allHistory')) || [];
        localStorage.setItem('history', JSON.stringify(history));
        console.log(savedHistory);
        for (i = 0; i < savedHistory.length; i++) {
            if (savedHistory[i] === history) {
                console.log('duplicate search item detected')
                return
            } }
        savedHistory.push(history);
        localStorage.setItem('allHistory', JSON.stringify(savedHistory));
}
function getHistory() {
    var savedHistory = JSON.parse(localStorage.getItem('allHistory')) || [];
    historyList.innerHTML = '';
        for (i = 0; i < savedHistory.length; i++) {
            var historyBtn = document.createElement('button')
            console.log('button test')
            console.log(savedHistory)
            historyBtn.innerHTML = savedHistory[i]
            historyBtn.setAttribute('class', 'history-btn')
            historyBtn.addEventListener('click', function handleClick(event) {
                console.log('history button clicked', event);
                citySelection = this.innerHTML
                console.log(citySelection)
                displayWeather()
            citySelection = $('#city-input').val() })
            console.log(i)
            console.log(savedHistory[i])
            historyList.appendChild(historyBtn)
        }
        }
    
    function displayWeather() {
        
        if (citySelection === '') { return }
    document.getElementById('five-day').classList.remove('hide')
        var geoApi = 'https://api.openweathermap.org/geo/1.0/direct?q='+citySelection+',US&limit=1&appid=44ff41a4d8b49abe43f662ec93cbb1a6';
        console.log(citySelection);
        
        fetch(geoApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('geocoding data')
            console.log(data);
            var cityLat = data[0].lat;
            var cityLon = data[0].lon;
            console.log(cityLat,cityLon);
            currentCity.innerHTML = data[0].name + ', ' + data[0].state;

            
            setHistory();
            getHistory();
            
            function getFiveDay() {
                var fiveDayApi = 'https://api.openweathermap.org/data/2.5/forecast?lat='+cityLat+'&lon='+cityLon+'&units=imperial&appid=44ff41a4d8b49abe43f662ec93cbb1a6';
                fetch(fiveDayApi) 
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log('forecast data')
                console.log(data);
                for (i = 0, j =0; i < 40; i += 8, j++) {
                    var iconcode = data.list[i].weather[0].icon
                    var iconurl = "https://openweathermap.org/img/wn/" + iconcode + ".png";
                    var weatherDate = data.list[i].dt * 1000
                    weatherDate = new Date(weatherDate);
                    weatherDate = weatherDate.toLocaleString('en-US');
                    weatherDate = weatherDate.split(',');
                    document.getElementById(dailyIcons[j]).setAttribute('src', iconurl);
                    document.getElementById(dailyDates[j]).innerHTML = weatherDate[0];
                    document.getElementById(dailyTemps[j]).innerHTML = 'Temp: ' + data.list[i].main.temp + '&deg; fahrenheit';
                    document.getElementById(dailyWind[j]).innerHTML = 'Wind: ' + data.list[i].wind.speed + 'Mph';
                    document.getElementById(dailyHumidity[j]).innerHTML ='Humidity: ' + data.list[i].main.humidity + '%';
                   
                    var weatherDate = data.list[i].dt * 1000
                    weatherDate = new Date(weatherDate);
                    weatherDate = weatherDate.toLocaleString('en-US');
                    weatherDate = weatherDate.split(',');
                    
                }
                })
            }
        
            function getCurrent() {
                var currentApi = 'https://api.openweathermap.org/data/2.5/weather?lat='+cityLat+'&lon='+cityLon+'&units=imperial&appid=44ff41a4d8b49abe43f662ec93cbb1a6'
                fetch(currentApi) 
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log('current weather data')
                console.log(data);
                var iconcode = data.weather[0].icon
                var iconurl = "https://openweathermap.org/img/wn/" + iconcode + ".png";
                $('#icon').attr('src', iconurl);
                currentTemp.innerHTML = 'Temperature: ' + data.main.temp + '&deg; fahrenheit';
                currentWind.innerHTML = 'Wind speed: ' + data.wind.speed + "Mph";
                currentHumidity.innerHTML = 'Humidity: ' + data.main.humidity +'%';
                })
            }
            getCurrent();
            getFiveDay();
            }
            )
            
        }

$(window).on('load', function () {
    getHistory()
})


$('#city-search').on('click', function () {
    citySelection = $('#city-input').val();
    
        displayWeather();
         

})

$('#clear').on('click', function () {
    localStorage.clear()
    location.reload()
        })