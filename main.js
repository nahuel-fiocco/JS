document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("textLocation").focus();
  const weatherData = JSON.parse(localStorage.getItem("weatherData"));
  if (weatherData) {
    document.getElementById(
      "temperature"
    ).textContent = `${weatherData.location}: ${weatherData.temperature} °C`;
    document.getElementById("textLocation").value = `${weatherData.location}`;
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
    document.getElementById(
      "temperature"
    ).textContent = `Debes ingresar una ubicacion`;
  } else {
    const apiKey = "19b74674a6c35f1883a818fb8e078fb0";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const temperature = data.main.temp;
        const temperatureElement = document.getElementById("temperature");
        temperatureElement.textContent = `${location}: ${temperature} °C`;
        const dataObj = { location, temperature };
        localStorage.setItem("weatherData", JSON.stringify(dataObj));
      })
      .catch(() => {
        document.getElementById("temperature").textContent = "invalid location";
        localStorage.removeItem("weatherData");
      });
  }
}

function limpiar() {
  localStorage.removeItem("weatherData");
  document.getElementById("temperature").textContent = "";
  document.getElementById("textLocation").value = "";
}

function saveToLocalStorage(location, temperature) {
  const data = {
    location: location,
    temperature: temperature,
  };
  localStorage.setItem("weatherData", JSON.stringify(data));
}
