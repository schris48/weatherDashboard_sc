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

  // get day 1 date
  var dailyWeather1 = new Date(data.daily[1].dt * 1000).toLocaleString().split(",")[0];
  console.log("Day 1: " + dailyWeather1);
  day1Weather(dailyWeather1);

  // get day 2 date
  var dailyWeather2 = new Date(data.daily[2].dt * 1000).toLocaleString().split(",")[0]
  console.log("Day 2: " + dailyWeather2);
  day2Weather(dailyWeather2);

  // get day 3 date
  var dailyWeather3 = new Date(data.daily[3].dt * 1000).toLocaleString().split(",")[0]
  console.log("Day 3: " + dailyWeather3);
  day3Weather(dailyWeather3);

  // get day 4 date
  var dailyWeather4 = new Date(data.daily[4].dt * 1000).toLocaleString().split(",")[0]
  console.log("Day 4: " + dailyWeather4);
  day4Weather(dailyWeather4);

  // get day 5 date
  var dailyWeather5 = new Date(data.daily[5].dt * 1000).toLocaleString().split(",")[0]
  console.log("Day 5: " + dailyWeather5);
  day5Weather(dailyWeather5);

  // get day 1 temp
  var day1Temp = data.daily[1].temp.day + " °F";
  console.log(day1Temp);
  tempDay1(day1Temp);

  // get day 2 temp
  var day2Temp = data.daily[2].temp.day + " °F";
  console.log(day2Temp);
  tempDay2(day2Temp);

  // get day 3 temp
  var day3Temp = data.daily[3].temp.day + " °F";
  console.log(day3Temp);
  tempDay3(day3Temp);

  // get day 4 temp
  var day4Temp = data.daily[4].temp.day + " °F";
  console.log(day4Temp);
  tempDay4(day4Temp);

  // get day 5 temp
  var day5Temp = data.daily[5].temp.day + " °F";
  console.log(day5Temp);
  tempDay5(day5Temp);

  // get day 1 wind
  var day1Wind = data.daily[1].wind_speed + " MPH";
  console.log(day1Wind);
  windDay1(day1Wind);

  // get day 2 wind
  var day2Wind = data.daily[2].wind_speed + " MPH";
  console.log(day2Wind);
  windDay2(day2Wind);

  // get day 3 wind
  var day3Wind = data.daily[3].wind_speed + " MPH";
  console.log(day3Wind);
  windDay3(day3Wind);

  // get day 4 wind
  var day4Wind = data.daily[4].wind_speed + " MPH";
  console.log(day4Wind);
  windDay4(day4Wind);

  // get day 5 wind
  var day5Wind = data.daily[5].wind_speed + " MPH";
  console.log(day5Wind);
  windDay5(day5Wind);

  // get day 1 humidity
  var day1Humidity = data.daily[1].humidity + " %";
  console.log(day1Humidity);
  humidityDay1(day1Humidity);

  // get day 2 humidity
  var day2Humidity = data.daily[2].humidity + " %";
  console.log(day2Humidity);
  humidityDay2(day2Humidity);

  // get day 3 humidity
  var day3Humidity = data.daily[3].humidity + " %";
  console.log(day3Humidity);
  humidityDay3(day3Humidity);

  // get day 4 humidity
  var day4Humidity = data.daily[4].humidity + " %";
  console.log(day4Humidity);
  humidityDay4(day4Humidity);

  // get day 5 humidity
  var day5Humidity = data.daily[5].humidity + " %";
  console.log(day5Humidity);
  humidityDay5(day5Humidity);

});
};

var getCurrentCity = function(cityName) {
  $("#currentCityName").text(cityName);
}

var getCurrentDate = function() {
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
    uvEl.style.color="white";
  }
  else if (uvIndex <= 5) {
    uvEl.style.backgroundColor="yellow";
    uvEl.style.color="black";
  }
  else if (uvIndex <= 7) {
    uvEl.style.backgroundColor="orange";
    uvEl.style.color="black";
  }
  else if (uvIndex <= 10) {
    uvEl.style.backgroundColor="red";
    uvEl.style.color="white";
  } else {
    uvEl.style.backgroundColor="purple";
    uvEl.style.color="white";
  }
}

// Get current weather icon
var currentWeatherIcon = function(currentWeatherIcon) {
  var iconUrl = `http://openweathermap.org/img/wn/${currentWeatherIcon}@2x.png`
  $("#currentCityWeatherIcon").html("<img src='" + iconUrl + "'>");
}

// Get dates for five day forecast start

// day 1 date
var day1Weather = function(day1) {
  $("#day1-date").text(day1);
}

// day 2 date
var day2Weather = function(day2) {
  $("#day2-date").text(day2);
}

// day 3 date
var day3Weather = function(day3) {
  $("#day3-date").text(day3);
}

// day 4 date
var day4Weather = function(day4) {
  $("#day4-date").text(day4);
}

// day 5 date
var day5Weather = function(day5) {
  $("#day5-date").text(day5);
}

// Get dates for five day forecast ends

// Get temperatures for five day forecast starts

// day 1 temp
var tempDay1 = function(temp1) {
  $("#dayOneTemp").text(temp1);
}

// day 2 temp
var tempDay2 = function(temp2) {
  $("#dayTwoTemp").text(temp2);
}

// day 3 temp
var tempDay3 = function(temp3) {
  $("#dayThreeTemp").text(temp3);
}

// day 4 temp
var tempDay4 = function(temp4) {
  $("#dayFourTemp").text(temp4);
}

// day 5 temp
var tempDay5 = function(temp5) {
  $("#dayFiveTemp").text(temp5);
}

// Get temperatures for five day forecast ends

// Get wind speeds for five day forecast starts

// day 1 wind
var windDay1 = function(wind1) {
    $("#dayOneWind").text(wind1);
}
  
// day 2 temp
var windDay2 = function(wind2) {
  $("#dayTwoWind").text(wind2);
}
  
// day 3 temp
var windDay3 = function(wind3) {
  $("#dayThreeWind").text(wind3);
}
  
// day 4 temp
var windDay4 = function(wind4) {
  $("#dayFourWind").text(wind4);
}
  
// day 5 temp
var windDay5 = function(wind5) {
  $("#dayFiveWind").text(wind5);
}
// Get wind speeds for five day forecast ends

// Get humidity for five day forcasts starts
// day 1 humidity
var humidityDay1 = function(humidity1) {
  $("#dayOneHumidity").text(humidity1);
}
  
// day 2 humidity
var humidityDay2 = function(humidity2) {
    $("#dayTwoHumidity").text(humidity2);
}

// day 3 humidity
var humidityDay3 = function(humidity3) {
    $("#dayThreeHumidity").text(humidity3);
}

// day 4 humidity
var humidityDay4 = function(humidity4) {
    $("#dayFourHumidity").text(humidity4);
}

// day 5 humidity
var humidityDay5 = function(humidity5) {
    $("#dayFiveHumidity").text(humidity5);
}
// Get humidity for five day forecasts ends

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