document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".contenedorClima").classList.add("hidden");
  document.getElementById("textLocation").focus();
  const weatherData = JSON.parse(localStorage.getItem("weatherData"));
  if (weatherData) {
    document.querySelector(".contenedorClima").classList.remove("hidden");
    document.getElementById("temperature").textContent = `${weatherData.temperature}`;
    document.getElementById("feelsLike").textContent = `${weatherData.feelsLike}`;
    document.getElementById("humidity").textContent = `${weatherData.humidity}`;
    document.getElementById("wind").textContent = `${weatherData.wind}`;
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
    Swal.fire(`You have to enter location`);
  } else {
    const apiKey = "19b74674a6c35f1883a818fb8e078fb0";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        document.querySelector(".contenedorClima").classList.remove("hidden");
        let temperature = data.main.temp;
        temperature = temperature.toFixed(1);
        document.getElementById("temperature").textContent = `${temperature}`;

        let feelsLike = data.main.feels_like;
        feelsLike = feelsLike.toFixed(1);
        document.getElementById("feelsLike").textContent = `${feelsLike}`;

        const humidity = data.main.humidity;
        document.getElementById("humidity").textContent = `${humidity}`;

        let wind = data.wind.speed
        wind = (wind*3.6);
        wind = wind.toFixed(1);
        document.getElementById("wind").textContent = `${wind}`;

        const dataObj = { location, temperature, feelsLike, humidity, wind };
        localStorage.setItem("weatherData", JSON.stringify(dataObj));
      })
      .catch(() => { // en caso de error
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
    wind: wind
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
