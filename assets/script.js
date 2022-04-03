var searchedCityEl = document.querySelector("#searched-city");
var searchButtonEl = document.querySelector("#search-button");
var savedCityEl = document.querySelector("#saved-city");
var currentTempEl = document.querySelector("#current-temp");

//Get city name from search input from user
var convertToLatandLon = function(searchedCityEl) {
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchedCityEl + "&limit=1&appid=85128827aad4fb15f19c4556286ccef6";

    fetch(apiUrl)
    .then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                getCurrentForecast(data[0].lat, data[0].lon)
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
    console.log(lat, lon);
    var latAndLon = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=85128827aad4fb15f19c4556286ccef6";

    fetch (latAndLon).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
               // displayCurrentForecast(data.current.temp)
                console.log(data.current.temp, data.current.wind_speed, data.current.humidity, data.current.uvi);
                console.log(data.daily[1].temp.max, data.daily[1].wind_speed, data.daily[1].humidity);
            });
        } else {
            alert("No City Found");
        }
    });
};

var buttonClickHandler = function(event) {
    event.preventDefault();

    var searchedCity = searchedCityEl.value.trim();

    if (searchedCity) {
        convertToLatandLon(searchedCity);
        searchedCityEl.value = "";
        var cityEl = document.createElement("button");
        cityEl.classList = "list-item flex-row justify-space-between align-center btn-block btn-secondary";
        cityEl.setAttribute("btn", searchedCity);
        //append to page
        cityEl.appendChild(savedCityEl);
        
    } else {
        alert("Please enter a valid city");
    }
};

var displayCurrentForecast = function(currentTemp) {
    //display current forecast
    //create and display currentTemp element to page
    var currentTemp = document.createElement("span");
    currentTemp.textContent = getCurrentForecast.data.current.temp;
    currentTemp.append(currentTempEl);

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