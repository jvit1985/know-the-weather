var searchedCityEl = document.querySelector("#searched-city");
var searchButtonEl = document.querySelector("#search-button");
var savedCityEl = document.querySelector("#saved-city");
var currentTempEl = document.querySelector("#current-temp");
var currentCityEl = document.querySelector("#current-city");
var currentWindEl = document.querySelector("#current-wind");
var currentHumidityEl = document.querySelector("#current-humidity");
var currentUvEl = document.querySelector("#current-uv");
var cardFormEl = document.querySelector("#card-form");

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
                currentTempEl.textContent = "Temp: " + data.daily[0].temp.max + " °F";
                currentWindEl.textContent = "Wind: " + data.daily[0].wind_speed + " MPH";
                currentHumidityEl.textContent = "Humidity: " + data.daily[0].humidity + " %";
                currentUvEl.textContent = "UV Index: " + data.daily[0].uvi;

                for (var i = 1; i < 6; i++) {
                    var card = document.createElement("div")
                    card.className = "card-body";
                    card.id = "day[i]";
                    var forecastTemp = document.createElement("p");
                    forecastTemp.textContent = "Temp: " + data.daily[i].temp.max + " °F";
                    var forecastWind = document.createElement("p");
                    forecastWind.textContent = "Wind: " + data.daily[i].wind_speed + " MPH";
                    var forecastHumidity = document.createElement("p");
                    forecastHumidity.textContent = "Humidity: " + data.daily[i].humidity + " %";
                    cardFormEl.appendChild(card);
                    card.appendChild(forecastTemp);
                    card.appendChild(forecastWind);
                    card.appendChild(forecastHumidity);
                }
            });
        } else {
            alert("No City Found");
        }
    });
};

var displayCity = function(city) {
    currentCityEl.textContent = city;
    var savedCity = document.createElement("button");
    savedCity.textContent = city;
    savedCity.classList = "btn btn-secondary btn-block";
    savedCityEl.appendChild(savedCity);
         
    searchedCityEl.value = "";
}

var buttonClickHandler = function(event) {

    var searchedCity = searchedCityEl.value.trim();

    if (searchedCity) {
        convertToLatandLon(searchedCity);
        
    } else {
        alert("Please enter a valid city");
    }
};

var savedCityClickHandler = function(event) {

    console.log(savedCityEl);

}

//event listener for search button click
searchButtonEl.addEventListener("click", buttonClickHandler);

//event listener for stored searches click
savedCityEl.addEventListener("click", savedCityClickHandler);