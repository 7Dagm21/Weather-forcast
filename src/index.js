// Define the API key and endpoint
const apiKey = "775t5215o362facd07db64465329fca1"; // Replace with your actual API key

// Function to format the current date
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

// Function to fetch weather data for the searched city
function fetchWeather(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then((response) => {
      // Extract temperature and city name
      let temperature = Math.round(response.data.temperature.current);
      let cityName = response.data.city;
      let descriptionValue=document.querySelector("#description")
      
      let humidityValue = document.querySelector("#humidity");
      
      let windValue = document.querySelector("#wind");
      let iconValue=document.querySelector("#icon");
      


      // Update the page with city name and temperature
      document.querySelector("#current-city").innerHTML = cityName;
      document.querySelector("#temperature").innerHTML = `${temperature}`;
      descriptionValue.innerHTML=response.data.condition.description;
      humidityValue.innerHTML = `${response.data.temperature.humidity}%`;
      windValue.innerHTML = `${response.data.wind.speed} km/hr`;

      // Set the current date on page load
      let currentDateElement = document.querySelector("#current-date");
      let currentDate = new Date();
      currentDateElement.innerHTML = formatDate(currentDate);
      iconValue.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon" />`;
    })
    .catch((error) => {
      console.error(
        "Error fetching weather data:",
        error.response || error.message || error
      );
      document.querySelector("#current-city").innerHTML = "City not found";
      document.querySelector("#temperature").innerHTML = "";
    });
}

// Function to handle form submission
function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value.trim();

  if (city) {
    fetchWeather(city);
  }
}

// Add event listener to the search form
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
fetchWeather("Addis Ababa");
