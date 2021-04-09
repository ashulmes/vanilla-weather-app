// TIME AND DATE  //

let now = new Date();

let date = now.getDate();

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

let timeAndDate = document.querySelector("#date-and-time");
timeAndDate.innerHTML = `${date} ${month}, ${hour}:${minutes}`;

// DISPLAY WEATHER //

function displayWeather(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temperature-value").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} MPH`;
  document.querySelector("#feels-like").innerHTML = `${Math.round(
    response.data.main.feels_like
  )}°C`;
}

// CITY SEARCH //

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = document.querySelector("#city-name");
  let unit = "metric";
  let apiKey = "4a150b550611ee8a27e04e337620852b";
  let apiSearchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${unit}`;

  if (searchInput.value === 0) {
    alert("Please type a city.");
  }

  axios.get(apiSearchUrl).then(displayWeather);
}

let searchForm = document.querySelector("#city-search-form");
searchForm.addEventListener("submit", search);

// GEOLOCATION BUTTON //

function handlePosition(position) {
  let unit = "metric";
  let apiKey = "4a150b550611ee8a27e04e337620852b";
  let apiLocationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${unit}`;

  axios.get(apiLocationUrl).then(displayWeather);
}

function getCurrentPosition(event) {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let locateButton = document.querySelector("#locate-button");
locateButton.addEventListener("click", getCurrentPosition);

// DEFAULT CITY //

function defaultSearch(searchInput) {
  let unit = "metric";
  let defaultCity = "Manchester";
  let apiKey = "4a150b550611ee8a27e04e337620852b";
  let apiDefaultUrl = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=${apiKey}&units=${unit}`;
  document.querySelector("#city-name").innerHTML = `${defaultCity}`;

  axios.get(apiDefaultUrl).then(displayWeather);
}

// CELCIUS AND FAHRENHEIT //

/*

let temperature = document.querySelector("#temperature-value");
let fahrenheit = document.querySelector("#fahrenheit-link");
let celsius = document.querySelector("#celsius-link");

function changeToFahrenheit(event) {
  event.preventDefault();
  temperature.innerHTML = 48;
  fahrenheit.innerHTML = `| <strong>°F</strong>`;
  celsius.innerHTML = `°C `;
}

function changeToCelsius(event) {
  event.preventDefault();
  temperature.innerHTML = 9;
  fahrenheit.innerHTML = `| °F`;
  celsius.innerHTML = `<strong>°C</strong> `;
}

fahrenheit.addEventListener("click", changeToFahrenheit);
celsius.addEventListener("click", changeToCelsius);

*/

defaultSearch("Manchester");
