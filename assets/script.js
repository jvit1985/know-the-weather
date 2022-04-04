var searchedCityEl = document.querySelector("#searched-city");
var searchButtonEl = document.querySelector("#search-button");
var savedCityEl = document.querySelector("#saved-city");
var currentTempEl = document.querySelector("#current-temp");
var currentCityEl = document.querySelector("#current-city");
var currentWindEl = document.querySelector("#current-wind");
var currentHumidityEl = document.querySelector("#current-humidity");
var currentUvEl = document.querySelector("#current-uv");
var cardFormEl = document.querySelector("#card-form");
var date = dayjs().format("MM/DD/YYYY");

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

// display Current and 5-day forecast
var getCurrentForecast = function(lat, lon) {
    var latAndLon = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=85128827aad4fb15f19c4556286ccef6";

    fetch (latAndLon).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                currentTempEl.textContent = "Temp: " + data.daily[0].temp.max + " °F";
                currentWindEl.textContent = "Wind: " + data.daily[0].wind_speed + " MPH";
                currentHumidityEl.textContent = "Humidity: " + data.daily[0].humidity + " %";
                //check if UV Index is low, moderate, or high
                if (data.daily[0].uvi < 3) {
                    currentUvEl.classList = "p-0 alert alert-success";
                } else if (data.daily[0].uvi > 6) {
                    currentUvEl.classList = "p-0 alert alert-danger";
                } else {
                    currentUvEl.classList = "p-0 alert alert-warning";
                };
                currentUvEl.textContent = "UV Index: " + data.daily[0].uvi;
                //loop through daily api data and generate 5 day forecast data
                for (var i = 1; i < 6; i++) {
                    var card = document.createElement("div")
                    card.className = "card-body m-1 text-white bg-dark";
                    card.id = "day[i]";
                    var tempDate = dayjs().add([i], 'day');
                    var forecastDate = document.createElement("h4");
                    forecastDate.classList = "card-title";
                    forecastDate.textContent = dayjs(tempDate).format("MM/DD/YYYY");
                    var forecastTemp = document.createElement("p");
                    forecastTemp.classList = "card-text";
                    forecastTemp.textContent = "Temp: " + data.daily[i].temp.max + " °F";
                    var forecastWind = document.createElement("p");
                    forecastWind.classList = "card-text";
                    forecastWind.textContent = "Wind: " + data.daily[i].wind_speed + " MPH";
                    var forecastHumidity = document.createElement("p");
                    forecastHumidity.classList = "card-text";
                    forecastHumidity.textContent = "Humidity: " + data.daily[i].humidity + " %";
                    //append generated data to 5 day forecast cards
                    cardFormEl.appendChild(card);
                    card.appendChild(forecastDate);
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
    //display city and date
    currentCityEl.textContent = city + " (" + date + ")";
    //create saved city button
    var savedCity = document.createElement("button");
    savedCity.textContent = city;
    savedCity.classList = "btn btn-secondary btn-block";
    //display saved city button to page
    savedCityEl.appendChild(savedCity);
    //reset search for city input field     
    searchedCityEl.value = "";
}

//function to search for city name in api on click
var buttonClickHandler = function(event) {

    var searchedCity = searchedCityEl.value.trim();

    if (searchedCity) {
        convertToLatandLon(searchedCity);
        
    } else {
        alert("Please enter a valid city");
    }
};

//function to search for saved city name in api on click
var savedCityClickHandler = function(event) {

    console.log(savedCityEl.textContent);

}

//event listener for search button click
searchButtonEl.addEventListener("click", buttonClickHandler);

//event listener for stored searches click
savedCityEl.addEventListener("click", savedCityClickHandler);