/*Homework 3 below
let weather = {
paris: {
temp: 19.7,
humidity: 80
},
tokyo: {
temp: 17.3,
humidity: 50
},
lisbon: {
temp: 30.2,
humidity: 20
},
"san francisco": {
temp: 20.9,
humidity: 100
},
moscow: {
temp: -5,
humidity: 20
}
};

write your code here
"Enter a city" (example: Paris), alert "It is currently 19°C (66°F) in Paris with a humidity of 80%"
alert "Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+sydney".

let city = prompt("Enter a City???").toLowerCase();

if (weather[city] !== undefined) {
let humidity = weather[city].humidity;
let temp = Math.round(weather[city].temp);
let tempF = Math.round(weather[city].temp * 1.8) + 32;

alert(
`It is currently ${temp}ºC (${tempF}ºF) in ${city} with a humidity of ${humidity}%.`
);
} else {
alert(
`Sorry, we do not know the weather for this city. Try going to https://www.google.com/search?q=weather+${city}`
 );
}*/

//Homework 4 below
//display the current date and time

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/*let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];*/

let day = days[now.getDay()];
let month = now.getMonth() + 1;
if (month < 10) {
  month = `0${month}`;
}
let date = now.getDate();
if (date < 10) {
  date = `0${date}`;
}
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let nowDay = document.querySelector("#day");
nowDay.innerHTML = ` ${day} - ${month}/${date}`;

let nowTime = document.querySelector("#time");
nowTime.innerHTML = ` ${hours}:${minutes}`;

//WEEK 5

function showTemperature(response) {
  let weatherTemp = document.querySelector("#newTemp");
  let tempNow = Math.round(response.data.main.temp);

  weatherTemp.innerHTML = `${tempNow}`;

  let description = document.querySelector("#tempDescription");
  description.innerHTML = response.data.weather[0].main;
  //console.log(response);
  let feels = document.querySelector("#feels");
  feels.innerHTML = `Feels like ${Math.round(
    response.data.main.feels_like
  )} ºC`;

  let humidity = response.data.main.humidity;
  let div = document.querySelector(`#humidity`);
  div.innerHTML = `Humidity: ${humidity} %`;

  let windBlowing = document.querySelector("#wind");
  windBlowing.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} m/s`;
}
function searchCity(event) {
  event.preventDefault();
  let apiKey = "84bf783b0426ae0eabcc200e14cbdb41";
  let typeCity = document.querySelector("#searchBar");
  let h5 = document.querySelector("#newCity");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${typeCity.value}&units=metric&appid=${apiKey}`;
  h5.innerHTML = `${typeCity.value}`;
  axios.get(apiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#findCity");
searchForm.addEventListener("submit", searchCity);

function showWeather(response) {
  let tempSelect = document.querySelector("#newTemp");
  let currentTemp = Math.round(response.data.main.temp);
  console.log(currentTemp);

  tempSelect.innerHTML = `${currentTemp}`;

  let placeSelector = document.querySelector("#newCity");
  //console.log(response);
  let currentLocation = response.data.name;
  placeSelector.innerHTML = `${currentLocation}`;

  let description = document.querySelector("#tempDescription");
  description.innerHTML = response.data.weather[0].main;
  //console.log(response);
  let feels = document.querySelector("#feels");
  feels.innerHTML = `Feels like ${Math.round(
    response.data.main.feels_like
  )} ºC`;

  let humidity = response.data.main.humidity;
  let div = document.querySelector(`#humidity`);
  div.innerHTML = `Humidity: ${humidity} %`;

  let windBlowing = document.querySelector("#wind");
  windBlowing.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} m/s`;
}

function retrieveLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "84bf783b0426ae0eabcc200e14cbdb41";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function showWeatherNow(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(retrieveLocation);
}

let weatherNowButton = document.querySelector("#weatherCurrent");
weatherNowButton.addEventListener("click", showWeatherNow);

//add a search engine, when searching for a city...display city name on play

//BONUS*** display a fake temperature in Celsius and covert to Fahrenheit

/*function nowCelsius(event) {
  let celsius = 34;
  event.preventDefault();
  let ºc = document.querySelector(".tempNow");
  ºc.innerHTML = celsius;
}
function nowFahrenheit(event) {
  let fahrenheit = 92;
  event.preventDefault();
  let ºf = document.querySelector(".tempNow");
  ºf.innerHTML = fahrenheit;
}

let celsiusScale = document.querySelector("#celsius");
let fahrenheitScale = document.querySelector("#fahrenheit");

celsiusScale.addEventListener("click", nowCelsius);
fahrenheitScale.addEventListener("click", nowFahrenheit);*/
