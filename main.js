document.addEventListener("DOMContentLoaded", function () {
  const contenedorClima = document.querySelector(".contenedorClima");
  const temperatureElement = document.getElementById("temperature");
  const feelsLikeElement = document.getElementById("feelsLike");
  const humidityElement = document.getElementById("humidity");
  const windElement = document.getElementById("wind");
  const textLocationElement = document.getElementById("textLocation");
  const temperatureUnitElement = document.querySelector(".temperatureUnit");
  const feelsLikeUnitElement = document.querySelector(".feelsLikeUnit");
  const humidityUnitElement = document.querySelector(".humidityUnit");
  const windUnitElement = document.querySelector(".windUnit");

  contenedorClima.classList.add("hidden");
  textLocationElement.focus();
  const weatherData = JSON.parse(localStorage.getItem("weatherData"));
  if (weatherData) {
    contenedorClima.classList.remove("hidden");
    temperatureElement.textContent = `${weatherData.temperature}`;
    feelsLikeElement.textContent = `${weatherData.feelsLike}`;
    humidityElement.textContent = `${weatherData.humidity}`;
    windElement.textContent = `${weatherData.wind}`;
    textLocationElement.value = `${weatherData.location}`;
    temperatureUnitElement.textContent = "°C";
    feelsLikeUnitElement.textContent = "°C";
    humidityUnitElement.textContent = "%";
    windUnitElement.textContent = "km/h";
  }
});

const button = document.getElementById("getTemperature");
button.addEventListener("click", getTemperature);
const enter = document.getElementById("textLocation");
enter.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    document.getElementById("getTemperature").click();
  }
});
const limpiarButton = document.getElementById("limpiar");
limpiarButton.addEventListener("click", limpiar);

function getTemperature() {
  const location = document.getElementById("textLocation").value;
  if (!location) {
    Swal.fire(`You have to enter location`);
  } else {
    const apiKey = "19b74674a6c35f1883a818fb8e078fb0";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const contenedorClima = document.querySelector(".contenedorClima");
        const temperature = data.main.temp.toFixed(1);
        const feelsLike = data.main.feels_like.toFixed(1);
        const humidity = data.main.humidity;
        const wind = (data.wind.speed * 3.6).toFixed(1);

        contenedorClima.classList.remove("hidden");
        document.getElementById("temperature").textContent = `${temperature}`;
        document.getElementById("feelsLike").textContent = `${feelsLike}`;
        document.getElementById("humidity").textContent = `${humidity}`;
        document.getElementById("wind").textContent = `${wind}`;
        document.querySelector(".temperatureUnit").textContent = "°C";
        document.querySelector(".feelsLikeUnit").textContent = "°C";
        document.querySelector(".humidityUnit").textContent = "%";
        document.querySelector(".windUnit").textContent = "km/h";

        const dataObj = { location, temperature, feelsLike, humidity, wind };
        localStorage.setItem("weatherData", JSON.stringify(dataObj));
      })
      .catch(() => {
        localStorage.removeItem("weatherData");
      });
  }
}

function limpiar() {
  document.querySelector(".contenedorClima").classList.add("hidden");
  localStorage.removeItem("weatherData");
  document.getElementById("textLocation").value = "";
  document.getElementById("temperature").textContent = "";
  document.getElementById("feelsLike").textContent = "";
  document.getElementById("humidity").textContent = "";
  document.getElementById("wind").textContent = "";
}

function saveToLocalStorage(location, temperature, feelsLike, humidity, wind) {
  const data = {
    location: location,
    temperature: temperature,
    feelsLike: feelsLike,
    humidity: humidity,
    wind: wind,
  };
  localStorage.setItem("weatherData", JSON.stringify(data));
}

const btnSwitch = document.querySelector("#switch");

btnSwitch.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  btnSwitch.classList.toggle("active");
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("darky", "true");
  } else {
    localStorage.setItem("darky", "false");
  }
});
if (localStorage.getItem("darky") === "true") {
  document.body.classList.add("dark-mode");
  btnSwitch.classList.add("active");
} else {
  document.body.classList.remove("dark-mode");
  btnSwitch.classList.remove("active");
}
