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

function displayForecast(response) {
  console.log(response.data.list[0]);
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <h3>
        ${formatHours(forecast.dt * 1000)}
      </h3>
      <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png" alt="" id="weekDay"><strong>${Math.round(
      forecast.main.temp_max
    )}°</strong></div>`;
  }
}

//rewrite code so front page will look good
/*function searchCity(event) {
  event.preventDefault();
  let apiKey = "84bf783b0426ae0eabcc200e14cbdb41";
  let typeCity = document.querySelector("#searchBar");
  let h5 = document.querySelector("#newCity");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${typeCity.value}&units=metric&appid=${apiKey}`;
  h5.innerHTML = `${typeCity.value}`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${typeCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);}*/

/*let searchForm = document.querySelector("#findCity");
searchForm.addEventListener("submit", searchCity);*/

function searchCity(city) {
  let apiKey = "84bf783b0426ae0eabcc200e14cbdb41";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function submitCity(event) {
  event.preventDefault();
  let inputElement = document.querySelector("#searchBar");
  let h5 = document.querySelector("#newCity");
  h5.innerHTML = inputElement.value;
}

let searchForm = document.querySelector("#findCity");
searchForm.addEventListener("submit", submitCity);

searchCity("Houston");

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
  let tempElement = document.querySelector("#newTemp");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitScale = (celsiusScale * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitScale);
}

function nowCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let tempElement = document.querySelector("#newTemp");
  tempElement.innerHTML = Math.round(celsiusScale);
}

let celsiusScale = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", nowFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", nowCelsius);

/*let h5 = document.querySelector("#newCity");
let apiKey = "84bf783b0426ae0eabcc200e14cbdb41";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Houston&units=metric&appid=${apiKey}`;
h5.innerHTML = `Houston`;
axios.get(apiUrl).then(showTemperature);*/
