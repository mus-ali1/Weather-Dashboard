var apiKey = "64364aff8f1f06d28b058755f3637866";

function generateUrl(city) {

    return `api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
}

function makeRequest(url) {
    return fetch(endpoint);

}



var city = "";

fetch(queryUrl);

console.log("hello from api ")