var apiKey = "64364aff8f1f06d28b058755f3637866";

function generateUrl(city) {

    return `api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
}

function makeRequest(url) {
    return fetch(endpoint).then(function (response) {
        return response.json();
    });
}


var city = "Birmingham"

var endpoint = generateUrl(city);

makeRequest(endpoint).then(function (weatherInfo) {

})

console.log(makeRequest);