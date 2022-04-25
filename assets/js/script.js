var currentWeatherListEl = document.querySelector("#currentWeatherList");
var uvEl = document.getElementById("uvi");

// OpenWeather API key
var apiKey = "f43bef6702081b0d80bffa501085acdf";

// Get latitude/ longitude
var getLatLon = function(search) {
  currentWeatherListEl.style.display="block";
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

  // get current weather array
  var currentWeatherArr = data.current.weather

  // get weather icon from current weather array
  var currentWeatherIconId = currentWeatherArr[0].icon;
  console.log(currentWeatherIconId)
  currentWeatherIcon(currentWeatherIconId);

  // get day 1 weather array
  var dailyWeather1 = new Date(data.daily[1].dt * 1000).toLocaleString().split(",")[0];
  console.log("Day 1: " + dailyWeather1);
  day1Weather(dailyWeather1);

  // get day 2 weather array
  var dailyWeather2 = new Date(data.daily[2].dt * 1000).toLocaleString().split(",")[0]
  console.log("Day 2: " + dailyWeather2);
  day2Weather(dailyWeather2);

  // get day 3 weather array
  var dailyWeather3 = new Date(data.daily[3].dt * 1000).toLocaleString().split(",")[0]
  console.log("Day 3: " + dailyWeather3);
  day3Weather(dailyWeather3);

  // get day 4 weather array
  var dailyWeather4 = new Date(data.daily[4].dt * 1000).toLocaleString().split(",")[0]
  console.log("Day 4: " + dailyWeather4);
  day4Weather(dailyWeather4);

  // get day 5 weather array
  var dailyWeather5 = new Date(data.daily[5].dt * 1000).toLocaleString().split(",")[0]
  console.log("Day 5: " + dailyWeather5);
  day5Weather(dailyWeather5);
});
};

var getCurrentCity = function(cityName) {
  $("#currentCityName").text(cityName);
}

var getCurrentDate = function() {
    //console.log('Moment test: ', moment().format('l'))
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
  if (uvIndex <= 2) {
    uvEl.style.backgroundColor="green";
  }
  else if (uvIndex <= 5) {
    uvEl.style.backgroundColor="yellow";
  }
  else if (uvIndex <= 7) {
    uvEl.style.backgroundColor="orange";
  }
  else if (uvIndex <= 10) {
    uvEl.style.backgroundColor="red";
  } else {
    uvEl.style.backgroundColor="purple";
  }
}

var currentWeatherIcon = function(currentWeatherIcon) {
  var iconUrl = `http://openweathermap.org/img/wn/${currentWeatherIcon}@2x.png`
  $("#currentCityWeatherIcon").html("<img src='" + iconUrl + "'>");
}

var day1Weather = function(day1) {
  $("#day1-date").text(day1);
}

var day2Weather = function(day2) {
  $("#day2-date").text(day2);
}

var day3Weather = function(day3) {
  $("#day3-date").text(day3);
}

var day4Weather = function(day4) {
  $("#day4-date").text(day4);
}

var day5Weather = function(day5) {
  $("#day5-date").text(day5);
}

// Five day forecast array
const fiveDayArr = [
    {
        day: 1,
      //   date:
      //   icon:
      //   temp:
      //   wind:
      //   humidity:
    },
    {
        day: 2,
      //   date:
      //   icon:
      //   temp:
      //   wind:
      //   humidity:
    },
    {
      day: 3,
    //   date:
    //   icon:
    //   temp:
    //   wind:
    //   humidity:
    },
    {
      day: 4,
    //   date:
    //   icon:
    //   temp:
    //   wind:
    //   humidity:
    },
    {
      day: 5,
    //   date:
    //   icon:
    //   temp:
    //   wind:
    //   humidity:
    }
  ];
        
// var fiveDayArr = ['dayOne', 'dayTwo', 'dayThree', 'dayFour', 'dayFive'];

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