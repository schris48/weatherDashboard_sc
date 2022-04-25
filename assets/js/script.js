// OpenWeather API key
var apiKey = "f43bef6702081b0d80bffa501085acdf";

// Five day forecast array
var fiveDayArr = ['dayOne', 'dayTwo', 'dayThree', 'dayFour', 'dayFive']

// Get latitude/ longitude
var getLatLon = function(search) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}`
    fetch(apiUrl)
    .then(function(res) {
      return res.json()
    })
    .then(function(data) {
      var currentCityNameEl = data.name
      console.log(currentCityNameEl);

      getForecast(data.coord.lat, data.coord.lon, currentCityNameEl)
      getCurrentCity(currentCityNameEl);
      getCurrentDate();
    });
}

// Get forecast based on lat and lon
var getForecast = function(lat, lon) {
  var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`

  fetch(oneCall)
  .then(function(res) {
    return res.json()
  })
  .then(function(data) {
    console.log(data);

  // get current temp
  var currentTempEl = data.current.temp + " °F";
  console.log(currentTempEl);
  currentCityTemp(currentTempEl);

  // get current wind speed
  var currentWindEl = data.current.wind_speed + " MPH"
  console.log(currentWindEl);
  currentCityWind(currentWindEl);

  // get current humidity percent
  var currentHumidityEl = data.current.humidity + " %"
  console.log(currentHumidityEl);
  currentCityHumidity(currentHumidityEl)

  // get current uv index
  var uvIndexEl = data.current.uvi
  console.log(uvIndexEl);
  uvi(uvIndexEl);
  
  // currentWeatherIcon(data.current)

  // get current weather array
  var currentWeatherArr = data.current.weather

  // get weather icon from current weather array
  var currentWeatherIconId = currentWeatherArr[0].icon;
  console.log(currentWeatherIconId)
  currentWeatherIcon(currentWeatherIconId);
  
  // // get weather icon based on icon id
  // var iconCall = `http://openweathermap.org/img/wn/${currentWeatherIconId}@2x.png`
    
    // fetch(iconCall)
    // .then(function(res) {
    //   return res.json
    // })
    // console.log(currentWeatherEl);
    // currentWeatherIcon(currentWeatherIconEl)
});
};

var getCurrentCity = function(cityName) {
  $("#currentCityName").text(cityName);
}

var getCurrentDate = function(moment) {
  $("#currentDate").text(moment().format('l'));
}

var currentCityTemp = function(currentCityTemp) {
  $("#currentCityTemp").text(currentCityTemp);
}

var currentCityWind = function(currentCityWind) {
  $("#currentCityWind").text(currentCityWind);
}

var currentCityHumidity = function(currentCityHumidity) {
  $("#currentCityHumidity").text(currentCityHumidity);
}

var uvi = function(uvIndex) {
  $("#uvi").text(uvIndex);
}

var currentWeatherIcon = function(currentWeatherIcon) {
  var iconUrl = `http://openweathermap.org/img/wn/${currentWeatherIcon}@2x.png`
  $("#currentCityWeatherIcon").html("<img src='" + iconUrl + "'>");
}

// var currentWeatherIcon = function(current) {
//   var iconUrl = `http://api.openweathermap.org/data/2.5/weather?q=${current}`
  
//   fetch(iconUrl)
//   .then(function(res) {
//     return res.json()
//   })
//   .then(function(current) {
//     console.log(current.weather.id)
//   })
// };

// generate search history list
var generateSearch = function(searchText, searchList) {
  var searchLi = $("<li>").addClass("list-item-cities");
  var searchP = $("<p>")
    .addClass("m-1")
    .text(searchText);
  // append p element to parent li
    searchLi.append(searchP);
  // append to ul on page
  $("#list-" + searchList).append(searchLi);

//   var weatherIcon = "http://openweathermap.org/img/wn/" + getWeatherIconId + "@2x.png";
//   console.log(weatherIcon);
  // each loop in the array requires its own image
  // to attach to our forecast container (build array for 5 day forecast)
}

// load search results
var loadSearches = function() {
  // check for local storage or empty array
  var searches = JSON.parse(localStorage.getItem("allSearches")) || []

  // check for empty or null value in search field
  if (!searches) {
    searches = [];

  // create list item for each searchItem
  searches.forEach(function(searchItem) {
  console.log(searchItem);
    generateSearch();
  });
}


// search button handler
$("#searchBtn").on("click", function() {
  var search = $("#searchInput").val();
  getLatLon(search)
  if (!search) {
      window.alert("Invalid entry! Please search by city name.")
      return false;
  }
  
  // check for local storage or empty array
  var searches = JSON.parse(localStorage.getItem("allSearches")) || []
  var newSearch = {
    'text': search,
  } 
  
  searches.push(newSearch);

  console.log(searches);

  // stringify value of local storage
  localStorage.setItem("allSearches", JSON.stringify(searches))
  });
}

// load search history
loadSearches();