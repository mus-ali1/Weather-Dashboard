var apiKey = "64364aff8f1f06d28b058755f3637866";
const inputEl = document.getElementById("city-input");
const searchEl = document.getElementById("search-button");
const searchInputEl = document.getElementById("search-input")
const searchHistory = document.getElementById("searchHistorySection");
const nameEl = document.getElementById("city-name");
const currentPicEl = document.getElementById("current-pic");
const currentTempEl = document.getElementById("temperature");
const currentHumidityEl = document.getElementById("humidity");
const currentWindEl = document.getElementById("wind-speed");
const currentUVEl = document.getElementById("UV-index");
const historyEl = document.getElementById("history");

//search button event listener
searchEl.addEventListener("click", searchEvent);

//search history event listener
searchHistory.addEventListener("click", searchHistoryClick)


// initiates search 
function searchEvent(event) {
  event.preventDefault();
  var userInput = searchInputEl.value.trim();

  console.log(searchInput);

  //Deals with a lack of user input 

  if (userInput === "") {
    alert("Please Input a destination !")
    return;
  }
  updateLocalStorage("city-input");
  updateclearEl();
  searchApi(userInput);
  inputEl.value = "";

}


// begin user query 

function searchApi(destination) {
  var city = destination;
  nameEl.textContent = city;


  // URL for current day only returns latitude and longitude

  var urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiIKey}`;

  fetch(urlApi)
    .then(function (response) {

      if (response.ok) {
        response.json()
          .then(function (data) {
            console.log(data)
            var lat = data.cootd.lat;
            var lon = data.coord.lon

            // creating a new fetch from the intial fetch which returned only 1 day weather forecast

            var sevenDayForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiIKey}`
            fetch(sevenDayForecast)
              .then(function (response2) {

                response2.json()
                  .then(function (data2) {
                    populateData(data2)
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
    currentPicEl[i].textContent = headerDate;
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
    searchHistory.push(city);
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