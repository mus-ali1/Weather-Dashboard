var apiKey = "64364aff8f1f06d28b058755f3637866";

var queryUrl = "api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

var city;

fetch(queryUrl);