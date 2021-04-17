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
timeAndDate.innerHTML = `Updated: ${date} ${month}, ${hour}:${minutes}`;

function formatForecastDay(timestamp) {
  let forecastDate = new Date(timestamp * 1000);
  let day = forecastDate.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

// DISPLAY FORECAST //

function displayForecast(response) {
  let forecast = response.data.daily;

  let dailyForecastElement = document.querySelector("#daily-forecast");

  let dailyForecastHTML = `
   <div class="row forecast-daily">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      dailyForecastHTML =
        dailyForecastHTML +
        `<div class="col">
		<div class="forecast-day">${formatForecastDay(forecastDay.dt)}</div>
		<img src="http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png" class="forecast-icons" />
		<div class="weather-forecast-temps">${Math.round(forecastDay.temp.day)}°C</div>
</div>
   `;
    }
  });

  dailyForecastHTML = dailyForecastHTML + `</div>`;
  dailyForecastElement.innerHTML = dailyForecastHTML;
}

function getForecast(coordinates) {
  let unit = "metric";
  let apiKey = "4a150b550611ee8a27e04e337620852b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}

// DISPLAY WEATHER //

function displayWeather(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temperature-value").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} MPH`;
  document.querySelector("#feels-like").innerHTML = `${Math.round(
    response.data.main.feels_like
  )}°C`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  celciusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

let iconElement = document.querySelector("#weather-icon");

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

defaultSearch("Manchester");
