var searchedCityEl = document.querySelector("#searched-city");
var searchButtonEl = document.querySelector("#search");
var savedCityEl = document.querySelector("#saved-city");
var currentTempEl = document.querySelector("#current-temp");

// fetch(apiUrl)
// .then(function(response) {
//     if(response.ok) {
//         response.json().then(function(data) {
//             console.log(data[0].lat, data[0].lon);
//         });
//     }
// });

// fetch(latAndLon)
// .then(function(response) {
//     if(response.ok) {
//         response.json().then(function(data) {
//             console.log(data.current.temp, data.current.wind_speed, data.current.humidity, data.current.uvi);
//         });
//     }
// });

//Get city name from search input from user
var convertToLatandLon = function(searchedCityEl) {
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchedCityEl + "&limit=1&appid=85128827aad4fb15f19c4556286ccef6";

    fetch(apiUrl)
    .then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data[0].lat, data[0].lon);
            });
        } else {
            document.location.replace("./index.html");
        }
    })
    .catch(function(error) {
        alert("Unable to connect to Weather Dashboard");
    });
};

var getCurrentForecast = function(lat, lon) {
    var lat = json.stringify(convertToLatandLon(data[0].lat));
    var lon = json.stringify(convertToLatandLon(data[0].lon));
    var latAndLon = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=85128827aad4fb15f19c4556286ccef6";

    fetch (latAndLon).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayCurrentForecast(data.current.temp)
                console.log(data.current.temp);
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

//event listener for search button click
searchButtonEl.addEventListener("click", buttonClickHandler);

//event listener for stored searches click