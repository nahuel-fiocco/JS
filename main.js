document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("textLocation").focus();
});

const button = document.getElementById("getTemperature");
button.addEventListener("click", getTemperature);

const enter = document.getElementById("textLocation")
enter.addEventListener('keypress', function(event){
  if(event.key === 'Enter'){
    event.preventDefault();
    document.getElementById('getTemperature').click();
  }
})

function getTemperature() {
  const location = document.getElementById("textLocation").value.toUpperCase();
  if(!location){
    document.getElementById("temperature").textContent = `Debes ingresar una ubicacion`
  }
  else{
    const apiKey = "19b74674a6c35f1883a818fb8e078fb0";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const temperature = data.main.temp;
        const temperatureElement = document.getElementById("temperature");
        temperatureElement.textContent = `${location}: ${temperature} °C`;
      })
      .catch(() => document.getElementById('temperature').textContent = "Ubicaion invalida");
    }
}