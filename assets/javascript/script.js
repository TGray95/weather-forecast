var currentCity = document.getElementById('current-city');
var currentTemp = document.getElementById("current-temp");
var currentWind = document.getElementById('current-wind');
var currentHumidity = document.getElementById('current-humidity');
var currentUV = document.getElementById('current-uv');
var dailyWeather = document.getElementById('daily-weather');
var weatherCard = '<div class="col">' +
'<div class="card">'+
'<h5 class="card-title p-2"></h5>'+
  '<img src="http://openweathermap.org/img/wn/" + iconcode + ".png" class="card-img-top"/>'+
  '<div class="card-body">'+
    '<h3 class="card-title"></h3>'+
    '<p class="card-text">Temp </p>'+
    '<p class="card-text">Humidity </p>'+
    '<p class="card-text">Wind </p></div></div></div>';

function getFiveDay() {
    var fiveDayApi = 'http://api.openweathermap.org/data/2.5/forecast?lat='+cityLat+'&lon='+cityLon+'&appid=44ff41a4d8b49abe43f662ec93cbb1a6';
    fetch(fiveDayApi) 
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data);
    }
    )
}

function getCurrent() {
    var currentApi = 'https://api.openweathermap.org/data/2.5/weather?lat='+cityLat+'&lon='+cityLon+'&appid=44ff41a4d8b49abe43f662ec93cbb1a6'
    fetch(currentApi) 
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data);
    }
    )
}

$('#city-search').on('click', function () {
    var citySelection = $('#city-input').val();
    var geoApi = 'http://api.openweathermap.org/geo/1.0/direct?q='+citySelection+',US&limit=1&appid=44ff41a4d8b49abe43f662ec93cbb1a6';
    console.log(citySelection);
    function displayWeather() {
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

            function getFiveDay() {
                var fiveDayApi = 'http://api.openweathermap.org/data/2.5/forecast?lat='+cityLat+'&lon='+cityLon+'&units=imperial&appid=44ff41a4d8b49abe43f662ec93cbb1a6';
                fetch(fiveDayApi) 
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log('forecast data')
                console.log(data);
                dailyWeather.innerHTML = '';
                for (i = 0; i < 40; i += 8) {
                    var iconcode = data.list[i].weather[0].icon
                    var iconurl = "http://openweathermap.org/img/wn/" + iconcode + ".png";
                    
                    var weatherCard = '<div class="col">' +
                    '<div class="card">'+
                    '<h5 class="card-title p-2"></h5>'+
                    '<img src="http://openweathermap.org/img/wn/" + iconcode + ".png" class="card-img-top"/>'+
                    '<div class="card-body">'+
                    '<h3 class="card-title"></h3>'+
                    '<p class="card-text">Temp </p>'+
                    '<p class="card-text">Humidity </p>'+
                    '<p class="card-text">Wind </p></div></div></div>';
                    console.log(data.list[i].dt_txt);
                    dailyWeather.appendChild

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
                var iconurl = "http://openweathermap.org/img/wn/" + iconcode + ".png";
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
   
        displayWeather();
         

})


