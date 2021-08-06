
var inputEl = document.getElementById("city-input");
var searchEl = document.getElementById("search-button");
var searchInputEl = document.getElementById("search-input")
var searchHistory = document.getElementById("searchHistorySection");
var nameEl = document.getElementById("city-name");
var currentPicEl = document.getElementById("current-pic");
var currentTempEl = document.getElementById("temperature");
var currentHumidityEl = document.getElementById("humidity");
var currentWindEl = document.getElementById("wind-speed");
var currentUVEl = document.getElementById("UV-index");
var historyEl = document.getElementById("history");
var dateEl = document.getElementById("date");

//search button event listener
searchEl.addEventListener("click", searchEvent);

//search history event listener
searchHistory.addEventListener("click", searchHistoryClick)


// initiates search 
function searchEvent(event) {
  event.preventDefault();
  var userInput = inputEl.value.trim();




  //Deals with a lack of user input 

  if (userInput === "") {
    alert("Please Input a destination !")
    return;
  }

  updateLocalStorage(userInput);
  updateSearchHistoryEl();
  searchApi(userInput);
  inputEl.value = "";

}


// begin user query 

function searchApi(destination) {
  var city = destination;
  nameEl.textContent = city;

  var apiKey = "64364aff8f1f06d28b058755f3637866";
  // URL for current day only returns latitude and longitude

  var urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(urlApi)
    .then(function (response) {

      if (response.ok) {
        response.json()
          .then(function (data) {
            console.log(data)
            var lat = data.coord.lat;
            var lon = data.coord.lon;

            // creating a new fetch from the intial fetch which returned only 1 day weather forecast

            var sevenDayForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`
            fetch(sevenDayForecast)
              .then(function (response2) {


                response2.json()
                  .then(function (data2) {
                    populateData(data2)
                    console.log(data2)
                  })
              })

          });

        //in case of error on retrieved data
      } else {
        alert("error" + response.statusText);
      }

    })

}

function populateData(dataObject) {
  var dataSet = dataObject;

  for (var i = 0; i < 6; i++) {

    var headerDate = moment.unix(dataSet.daily[i].dt).format("DD/MM/YY");


    // UV index for current day
    if (i === 0) {
      currentUVEl.textContent = dataSet.daily[i].uvi;
      if (dataSet.daily[i].uvi <= 4) {
        currentUVEl.setAttribute("class", "lowUV");
      } else if (dataSet.daily[i].uvi < 7) {
        currentUVEl.setAttribute("class", "midUV");
      } else {
        currentUVEl.setAttribute("class", "highUV");
      }
    }

    //push content to the cards
    dateEl.textContent = headerDate;
    currentTempEl[i].textContent = dataSet.daily[i].temp.day + "°C";
    currentWindEl[i].textContent = dataSet.daily[i].wind_speed + "km/h";
    currentHumidityEl[i].textContent = dataSet.daily[i].humidity + "%";


    var icon = dataSet.daily[i].weather[0].icon;
    var iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    currentPicEl[i].setAttribute("src", iconUrl)


  }


}

//saves events to local storage
function updateLocalStorage(userInput) {

  var city = {
    name: userInput
  };

  var searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
  if (searchHistory === null) {
    searchHistory = [];

  }
  searchHistory.unshift(city);

  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

}

//fills in the search history
function updateSearchHistoryEl() {


  var searchHistoryEl = document.querySelector("#searchHistory");
  while (searchHistoryEl.firstChild) {
    searchHistoryEl.removeChild(searchHistoryEl.firstChild)
  }

  var searchHistoryItems = JSON.parse(localStorage.getItem("searchHistory"));

  if (searchHistoryItems === null) {
    return;
  }

  for (i = 0; i < searchHistoryItems.length; i++) {
    var liEl = document.createElement("li");
    liEl.innerHTML = searchHistoryItems[i].name;
    searchHistoryEl.appendChild(liEl);
  }



}


function searchHistoryClick(event) {
  event.preventDefault();

  var target = event.target;

  console.log("click");
  console.log(event.target);
  console.log(target);

  if (target.matches("li")) {
    searchAPI(target.textContent)
  }

}


updateSearchHistoryEl();





























// function generateUrl(city) {

//   return `https.//api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
// }

// function makeRequest(url) {
//   return fetch(generateUrl()).then(function (response) {
//     return response.json();

//   });
// }
// console.log(makeRequest)

// function getApi() {
//   // fetch request gets a list of all the repos for the node.js organization
//   var requestUrl = "https.//api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}"

//   fetch(requestUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data) }