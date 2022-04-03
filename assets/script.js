var searchedCityEl = document.querySelector("#searched-city");
var searchButtonEl = document.querySelector("#search-button");
var savedCityEl = document.querySelector("#saved-city");
var currentTempEl = document.querySelector("#current-temp");
var currentCityEl = document.querySelector("#current-city");
var currentWindEl = document.querySelector("#current-wind");
var currentHumidityEl = document.querySelector("#current-humidity");
var currentUvEl = document.querySelector("#current-uv");

//Get city name from search input from user
var convertToLatandLon = function(searchedCityEl) {
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchedCityEl + "&limit=1&appid=85128827aad4fb15f19c4556286ccef6";

    fetch(apiUrl)
    .then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                getCurrentForecast(data[0].lat, data[0].lon)
                displayCity(data[0].name)
            });
        } else {
            alert("No City Found");
        }
    })
    .catch(function(error) {
        alert("Unable to connect to Weather Dashboard");
    });
};


var getCurrentForecast = function(lat, lon) {
    var latAndLon = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=85128827aad4fb15f19c4556286ccef6";

    fetch (latAndLon).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                //displayForecast(data.daily[i].temp.max, data.daily[i].wind_speed, data.daily[i].humidity);
                currentTempEl.textContent = "Temp: " + data.daily[0].temp.max + " °F";
                currentWindEl.textContent = "Wind: " + data.daily[0].wind_speed + " MPH";
                currentHumidityEl.textContent = "Humidity: " + data.daily[0].humidity + " %";
                currentUvEl.textContent = "UV Index: " + data.daily[0].uvi;
               // console.log(data.daily[i].temp.max, data.daily[i].wind_speed, data.daily[i].humidity, data.daily[i].uvi);
            });
        } else {
            alert("No City Found");
        }
    });
};

var displayCity = function(city) {
    currentCityEl.textContent = city;
}

var buttonClickHandler = function(event) {
    event.preventDefault();

    var searchedCity = searchedCityEl.value.trim();

    if (searchedCity) {
        convertToLatandLon(searchedCity);
        //searchedCityEl.value = "";
        var cityEl = document.createElement("button");
        cityEl.classList = "list-item flex-row justify-space-between align-center btn-block btn-secondary";
        cityEl.setAttribute("btn", searchedCity);
        //append to page
        cityEl.appendChild(savedCityEl);
        searchedCityEl.value = "";
        
    } else {
        alert("Please enter a valid city");
    }
};

var displayForecast = function(currentTemp, currentWindSpeed, currentHumidity) {
    //display current forecast
    // currentTempEl.textContent = "Temp: " + currentTemp;
    // currentWindEl.textContent = "Wind: " + currentWindSpeed;
    // currentHumidityEl.textContent = "Humidity: " + currentHumidity;
    // currentUvEl.textContent = "UV Index: " + currentUvi;

    for (var i = 1; i < 6; i++) {

        var forecastDate = document.createElement("h4");
        forecastDate.textContent = date + [i];

        var forecastTemp = document.createElement("p");
        forecastTemp.textContent = "Temp: " + currentTemp[i];

        var forecastWind = document.createElement("p");
        forecastWind.textContent = "Wind: " + currentWindSpeed[i];
        
        var forecastHumidity = document.createElement("p");
        forecastHumidity.textContent = "Humidity: " + currentHumidity[i];

        // var forecastDate = document.createElement("h4");
        // forecastDate.textContent = date + [i];

        cardBodyEl.appendChild(forecastTemp);
        cardBodyEl.appendChild(forecastWind);
        cardBodyEl.appendChild(forecastHumidity);
        
    }

    //create and display currentTemp element to page
    
    //create and display currentWindSpeed element to page

    //create and display currentHumidity element to page

    //create and display currentUvi element to page
    

};

//display 5 day forecast

//call functions
//getCurrentForecast();

//event listener for search button click
searchButtonEl.addEventListener("click", buttonClickHandler);

//event listener for stored searches click