const apiKey = "64364aff8f1f06d28b058755f3637866";
const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");
const clearHistory = document.getElementById("clear-history");
const cityName = document.getElementById("city-name");
const currentPic = document.getElementById("current-pic");
const currentTemp = document.getElementById("temperature");
const currentHumidity = document.getElementById("humidity"); 4
const currentWind = document.getElementById("wind-speed");
const currentUV = document.getElementById("UV-index");
const history = document.getElementById("history");
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
console.log(searchHistory);





// function searchEvent(event) {
//   event.preventDefault();
//   var userInput = searchInput.value.trim();

//   console.log(searchInput);

//   if (userInput === "") {
//     alert("Please Input a destination !")
//     return;
//   }
// }




































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
//       console.log(data)