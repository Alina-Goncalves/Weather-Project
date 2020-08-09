function getDate(timestamp) {
  let date = new Date(timestamp);
  let presentDate = date.getDate();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
  let weekDays = days[date.getDay()];
  let month = months[date.getMonth()];

  return `${weekDays}, ${month} ${presentDate} \xa0\xa0 ${getTime(timestamp)}`;
}

function getTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function apiSearch(city) {
  let apiKey = "06b5f102b5d87678883f70debd49073e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(getWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast/?q=${city}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(getForecast);
}

function getCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#inputCity");
  apiSearch(inputCity.value);
}
let formCity = document.querySelector("#inputForm");
formCity.addEventListener("submit", getCity);

function getWeather(response) {
  console.log(response.data);
  celsiusTemp = response.data.main.temp;
  celsiusMaxTemp = response.data.main.temp_max;
  celsiusMinTemp = response.data.main.temp_min;

  let displayTemp = document.querySelector("#currentTemp");
  displayTemp.innerHTML = Math.round(celsiusTemp);

  let displayMaxTemp = document.querySelector(".dayMaxTemperature");
  displayMaxTemp.innerHTML = `${Math.round(celsiusMaxTemp)}°`;

  let displayMinTemp = document.querySelector(".dayMinTemperature");
  displayMinTemp.innerHTML = ` / ${Math.round(celsiusMinTemp)}°`;

  let displayDescription = document.querySelector(".weatherDescription");
  displayDescription.innerHTML = response.data.weather[0].description;

  let displayHumidity = document.querySelector("#humidity");
  displayHumidity.innerHTML = `${response.data.main.humidity} %`;

  let displayWind = document.querySelector("#wind");
  displayWind.innerHTML = `${Math.round(response.data.wind.speed * 3.6)} km/h`;

  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  let currentDate = document.querySelector("#currentDateTime");
  currentDate.innerHTML = getDate(response.data.dt * 1000);

  let windDir = document.querySelector("#windDirection");
  let deg = response.data.wind.deg;

  if ((deg >= 11.25) & (deg < 33.75)) {
    windDir.innerHTML = `\xa0NNE`;
  } else if ((deg >= 33.75) & (deg < 56.25)) {
    windDir.innerHTML = `\xa0NE`;
  } else if ((deg >= 56.25) & (deg < 78.75)) {
    windDir.innerHTML = `\xa0ENE`;
  } else if ((deg >= 78.75) & (deg < 101.25)) {
    windDir.innerHTML = `\xa0E`;
  } else if ((deg >= 101.25) & (deg < 123.75)) {
    windDir.innerHTML = `\xa0ESE`;
  } else if ((deg >= 123.75) & (deg < 146.25)) {
    windDir.innerHTML = `\xa0SE`;
  } else if ((deg >= 146.25) & (deg < 168.75)) {
    windDir.innerHTML = `\xa0SSE`;
  } else if ((deg >= 168.75) & (deg < 191.25)) {
    windDir.innerHTML = `\xa0S`;
  } else if ((deg >= 191.25) & (deg < 213.75)) {
    windDir.innerHTML = `\xa0SSW`;
  } else if ((deg >= 213.75) & (deg < 236.25)) {
    windDir.innerHTML = `\xa0SW`;
  } else if ((deg >= 236.25) & (deg < 258.75)) {
    windDir.innerHTML = `\xa0WSW`;
  } else if ((deg >= 258.75) & (deg < 281.25)) {
    windDir.innerHTML = `\xa0W`;
  } else if ((deg >= 281.25) & (deg < 303.75)) {
    windDir.innerHTML = `\xa0WNW`;
  } else if ((deg >= 303.75) & (deg < 326.25)) {
    windDir.innerHTML = `\xa0NW`;
  } else if ((deg >= 326.25) & (deg < 348.75)) {
    windDir.innerHTML = `\xa0NNW`;
  } else {
    return (windDir.innerHTML = `\xa0N`);
  }

  let displayIcon = document.querySelector("#bigEmoji");
  let icon = response.data.weather[0].icon;

  if (icon === "01d") {
    displayIcon.innerHTML = `<img src="images/sun.png" alt="clear-sky"/>`;
  } else if (icon === "01n") {
    displayIcon.innerHTML = `<img src="images/moon.png" alt="clear-sky"/>`;
  } else if (icon === "02d") {
    displayIcon.innerHTML = `<img src="images/sun-small-cloud.png" alt="few-clouds"/>`;
  } else if (icon === "02n") {
    displayIcon.innerHTML = `<img src="images/moon-cloud.png" alt="few-clouds"/>`;
  } else if (icon === "03d") {
    displayIcon.innerHTML = `<img src="images/sun-big-cloud.png" alt="scattered-clouds"/>`;
  } else if (icon === "03n") {
    displayIcon.innerHTML = `<img src="images/cloud.png" alt="scattered-clouds"/>`;
  } else if (icon === "04d" || icon === "04n") {
    displayIcon.innerHTML = `<img src="images/broken-clouds.png" alt="broken-clouds"/>`;
  } else if (icon === "09d" || icon === "09n") {
    displayIcon.innerHTML = `<img src="images/shower-rain.png" alt="shower-rain"/>`;
  } else if (icon === "10d") {
    displayIcon.innerHTML = `<img src="images/sun-cloud-rain.png" alt="rain"/>`;
  } else if (icon === "10n") {
    displayIcon.innerHTML = `<img src="images/cloud-rain.png" alt="rain"/>`;
  } else if (icon === "11d" || icon === "11n") {
    displayIcon.innerHTML = `<img src="images/thunder-cloud-rain.png" alt="thunderstorm"/>`;
  } else if (icon === "13d" || icon === "13n") {
    displayIcon.innerHTML = `<img src="images/cloud-snow.png" alt="snow" />`;
  } else if (icon === "50d" || icon === "50n") {
    displayIcon.innerHTML = `<img src="images/fog.png" alt="mist"/>`;
  }
  return icon;
}

let celsiusTemp = null;
let celsiusMaxTemp = null;
let celsiusMinTemp = null;

function changeUnitCels(event) {
  event.preventDefault();
  let displayTemp = document.querySelector("#currentTemp");
  displayTemp.innerHTML = Math.round(celsiusTemp);

  let displayMaxTemp = document.querySelector(".dayMaxTemperature");
  displayMaxTemp.innerHTML = `${Math.round(celsiusMaxTemp)}°`;

  let displayMinTemp = document.querySelector(".dayMinTemperature");
  displayMinTemp.innerHTML = ` / ${Math.round(celsiusMinTemp)}°`;

  degrees.removeEventListener("click", changeUnitCels);
  fahrenheit.addEventListener("click", changeUnitFahr);

  degrees.classList.add("active");
  fahrenheit.classList.remove("active");
}

let degrees = document.querySelector("#getDegrees");
degrees.addEventListener("click", changeUnitCels);

function changeUnitFahr(event) {
  event.preventDefault();
  let displayTemp = document.querySelector("#currentTemp");
  let displayMaxTemp = document.querySelector(".dayMaxTemperature");
  let displayMinTemp = document.querySelector(".dayMinTemperature");

  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  displayTemp.innerHTML = Math.round(fahrenheitTemp);

  let fahrenheitMaxTemp = (celsiusMaxTemp * 9) / 5 + 32;
  displayMaxTemp.innerHTML = `${Math.round(fahrenheitMaxTemp)}°`;

  let fahrenheitMinTemp = (celsiusMinTemp * 9) / 5 + 32;
  displayMinTemp.innerHTML = ` / ${Math.round(fahrenheitMinTemp)}°`;

  fahrenheit.removeEventListener("click", changeUnitFahr);
  degrees.addEventListener("click", changeUnitCels);

  degrees.classList.remove("active");
  fahrenheit.classList.add("active");
}

let fahrenheit = document.querySelector("#getFahrenheit");
fahrenheit.addEventListener("click", changeUnitFahr);

function getForecast(response) {
  let displayForecast = document.querySelector("#forecast");
  displayForecast.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    displayForecast.innerHTML += `<div class="col" >
            <div class="card">
              <div class="card-body">
                <div class="weatherSymbols" >
                  ${forecastEmoji(forecast.weather[0].icon)}
                </div>
                <br />
                <strong>
                  ${getTime(forecast.dt * 1000)}
                </strong>
                <br />
                <br />
                <div class="temperature">
                  <span class="maxTemperature"> ${Math.round(
                    forecast.main.temp_max
                  )}</span>° / 
                  <span class="minTemperature"> ${Math.round(
                    forecast.main.temp_min
                  )}</span>°
                </div>
              </div>
            </div>
          </div>`;
  }
}

function forecastEmoji(icon) {
  let emoji = "";

  if (icon === "01d") {
    emoji = `<img src="images/sun.png" alt="clear-sky"/>`;
  } else if (icon === "01n") {
    emoji = `<img src="images/moon.png" alt="clear-sky"/>`;
  } else if (icon === "02d") {
    emoji = `<img src="images/sun-small-cloud.png" alt="few-clouds"/>`;
  } else if (icon === "02n") {
    emoji = `<img src="images/moon-cloud.png" alt="few-clouds"/>`;
  } else if (icon === "03d") {
    emoji = `<img src="images/sun-big-cloud.png" alt="scattered-clouds"/>`;
  } else if (icon === "03n") {
    emoji = `<img src="images/cloud.png" alt="scattered-clouds"/>`;
  } else if (icon === "04d" || icon === "04n") {
    emoji = `<img src="images/broken-clouds.png" alt="broken-clouds"/>`;
  } else if (icon === "09d" || icon === "09n") {
    emoji = `<img src="images/shower-rain.png" alt="shower-rain"/>`;
  } else if (icon === "10d") {
    emoji = `<img src="images/sun-cloud-rain.png" alt="rain"/>`;
  } else if (icon === "10n") {
    emoji = `<img src="images/cloud-rain.png" alt="rain"/>`;
  } else if (icon === "11d" || icon === "11n") {
    emoji = `<img src="images/thunder-cloud-rain.png" alt="thunderstorm"/>`;
  } else if (icon === "13d" || icon === "13n") {
    emoji = `<img src="images/cloud-snow.png" alt="snow"/>`;
  } else if (icon === "50d" || icon === "50n") {
    emoji = `<img src="images/fog.png" alt="mist"/>`;
  }
  return emoji;
}

function showPosition(position, city) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let nameCity = document.querySelector("#city");
  nameCity.innerHTML = `${city}`;

  let apiKey = "06b5f102b5d87678883f70debd49073e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(getWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(getForecast);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let geoButton = document.querySelector("#geoLocation");
geoButton.addEventListener("click", getLocation);

apiSearch("Porto");
