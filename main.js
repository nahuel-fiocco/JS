document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("textLocation").focus();
  const weatherData = JSON.parse(localStorage.getItem("dataObj"));
  if (weatherData) {
    contenedorClima.classList.remove("hidden");
    document.getElementById("textLocation").value = `${weatherData.location}`;
    document.getElementById("location").textContent = `${weatherData.location}`;
    document.getElementById("temperature").textContent = `${weatherData.temperature} °C`;
    document.getElementById("feelsLike").textContent = `Feels like ${weatherData.feelsLike} °C`;
    document.getElementById("humidity").textContent = `Humidity ${weatherData.humidity} %`;
    document.getElementById("wind").textContent = `Wind ${weatherData.wind} km/h`;
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
const contenedorClima = document.querySelector(".contenedorClima");
function getTemperature() {
  const location = document.getElementById("textLocation").value.toUpperCase();
  if (!location) {
    swal.fire("Please enter any location.")
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
        document.getElementById("location").textContent = `${location}`;
        document.getElementById("temperature").textContent = `${temperature} °C`;
        document.getElementById("feelsLike").textContent = `Feels like ${feelsLike} °C`;
        document.getElementById("humidity").textContent = `Humidity ${humidity} %`;
        document.getElementById("wind").textContent = `Wind ${wind} km/h`;

        const dataObj = { location, temperature, feelsLike, humidity, wind };
        localStorage.setItem("dataObj", JSON.stringify(dataObj));
      })
      .catch(() => {
        localStorage.removeItem("dataObj");
        swal.fire("Invalid location.")
        limpiar();
      });
  }
}

function limpiar() {
  document.querySelector(".contenedorClima").classList.add("hidden");
  document.getElementById("textLocation").value = "";
  document.getElementById("location").textContent = "";
  document.getElementById("temperature").textContent = "";
  document.getElementById("feelsLike").textContent = "";
  document.getElementById("humidity").textContent = "";
  document.getElementById("wind").textContent = "";
  localStorage.removeItem("dataObj");
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
