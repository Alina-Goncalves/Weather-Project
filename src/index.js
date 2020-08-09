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
}

function getCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#inputCity");
  apiSearch(inputCity.value);
}
let formCity = document.querySelector("#inputForm");
formCity.addEventListener("submit", getCity);

let degrees = document.querySelector("#getDegrees");
degrees.addEventListener("click", getCity);

function changeUnit() {
  let apiKey = "06b5f102b5d87678883f70debd49073e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&units=imperial`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(getWeather);
}
let fahrenheit = document.querySelector("#getFahrenheit");
fahrenheit.addEventListener("click", changeUnit);

function getWeather(response) {
  let displayTemp = document.querySelector("#currentTemp");
  displayTemp.innerHTML = Math.round(response.data.main.temp);

  let displayMaxTemp = document.querySelector(".dayMaxTemperature");
  displayMaxTemp.innerHTML = Math.round(response.data.main.temp_max);

  let displayMinTemp = document.querySelector(".dayMinTemperature");
  displayMinTemp.innerHTML = Math.round(response.data.main.temp_min);

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
}

function showPosition(position, city) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let nameCity = document.querySelector("#city");
  nameCity.innerHTML = `${city}`;

  let apiKey = "06b5f102b5d87678883f70debd49073e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(getWeather);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let geoButton = document.querySelector("#geoLocation");
geoButton.addEventListener("click", getLocation);

apiSearch("Porto");