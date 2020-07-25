let presentDay = new Date();

function getDate(date) {
  let dates = date.getDate();
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

  let displayDate = `${weekDays}, ${month} ${dates}`;
  return displayDate;
}
let currentDate = document.querySelector("#currentDate");
currentDate.innerHTML = getDate(presentDay);

function getTime(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let displayTime = `${hours}:${minutes}`;
  return displayTime;
}
let currentTime = document.querySelector("#currentTime");
currentTime.innerHTML = getTime(presentDay);

function getCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#inputCity");
  let city = document.querySelector("#city");
  city.innerHTML = `${inputCity.value}`;

  let apiKey = "06b5f102b5d87678883f70debd49073e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(getWeather);
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
  let nowTemp = Math.round(response.data.main.temp);
  let displayTemp = document.querySelector("#currentTemp");
  displayTemp.innerHTML = `${nowTemp}`;

  let maxTemp = Math.round(response.data.main.temp_max);
  let displayMaxTemp = document.querySelector(".dayMaxTemperature");
  displayMaxTemp.innerHTML = `${maxTemp}°`;

  let minTemp = Math.round(response.data.main.temp_min);
  let displayMinTemp = document.querySelector(".dayMinTemperature");
  displayMinTemp.innerHTML = `${minTemp}°`;

  let weatherDescription = response.data.weather[0].description;
  let displayDescription = document.querySelector(".weatherDescription");
  displayDescription.innerHTML = `${weatherDescription}`;

  let nowHumidity = response.data.main.humidity;
  let displayHumidity = document.querySelector("#humidity");
  displayHumidity.innerHTML = `${nowHumidity} %`;

  let nowWind = Math.round(response.data.wind.speed * 3.6);
  let displayWind = document.querySelector("#wind");
  displayWind.innerHTML = `${nowWind} km/h`;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let nameCity = document.querySelector("#city");
  nameCity.innerHTML = `Current Location`;

  let apiKey = "06b5f102b5d87678883f70debd49073e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(getWeather);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let geoButton = document.querySelector("#geoLocation");
geoButton.addEventListener("click", getLocation);
