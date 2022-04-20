//var searches = {};
//const allSearches = [];

// var apiKey = "f43bef6702081b0d80bffa501085acdf";
var apiKey = "c40b28aa33c2bef2881ab9e4f13c3ef7";
// var OneCall = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"

var getLatLon = function(search) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}`
    fetch(apiUrl)
    .then(function(res) {
      return res.json()
    })
    .then(function(data) {
      console.log(data)
      getForecast(data.coord.lat, data.coord.lon)
    });
}

var getForecast = function(lat, lon) {
  var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`

  fetch(oneCall)
  .then(function(res){
    return res.json()
  })
  .then(function(data) {
    console.log(data)
  });
};


// var currentCity = function(data) {
//   var currentCitySpan = $("#currentCityName").val(data.name);
//   console.log(data.name);
// }

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
}

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
//   // loop over object properties
//   $.each(searches, function(list, arr) {
//     console.log(list, arr);
//     // then loop over sub-array
//     arr.forEach(function(search) {
//       generateSearch(search.text, list);
//     })
//   })
// }


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

//   if (searches.length < 0) {
//     // allSearches.push(newSearch);
//     searches.push(newSearch);
//   } else {
//     allSearches.push(newSearch + allSearches);
//   }

  // stringify value of local storage
  localStorage.setItem("allSearches", JSON.stringify(searches))
  });
 }
// load search history
loadSearches();