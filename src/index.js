/*
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

function showTemperature(response) {
  let weatherTemp = document.querySelector("#newTemp");
  let tempNow = Math.round(response.data.main.temp);
  let description = document.querySelector("#tempDescription");
  let feels = document.querySelector("#feels");
  let humidity = response.data.main.humidity;
  let div = document.querySelector(`#humidity`);
  let windBlowing = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusScale = response.data.main.temp;

  tempElement.innerHTML = Math.round(celsiusScale);
  weatherTemp.innerHTML = `${tempNow}`;
  description.innerHTML = response.data.weather[0].main;
  feels.innerHTML = `Feels like ${Math.round(
    response.data.main.feels_like
  )} ºC`;
  div.innerHTML = `Humidity: ${humidity} %`;
  windBlowing.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} m/s`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
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
  let currentLocation = response.data.name;
  placeSelector.innerHTML = `${currentLocation}`;

  let description = document.querySelector("#tempDescription");
  description.innerHTML = response.data.weather[0].main;
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

function nowFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#tempNow");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitScale = celsiusScale * 1.8 + 32;
  tempElement.innerHTML = Math.round(fahrenheitScale);
}

function nowCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let tempElement = document.querySelector("#tempNow");
  tempElement.innerHTML = Math.round(celsiusScale);
}

let celsiusScale = null;

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", nowCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", nowFahrenheit);
