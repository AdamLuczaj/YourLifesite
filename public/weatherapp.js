//Please set your key here. If you are unsure how to do this please read the README for detailed steps.
const API_KEY = ""


//Function to get data from the API.
function getWeather() {

    let city = document.getElementById("input-box-city").value;
    let api = `https://api.openweathermap.org/data/2.5/weather?q=` + city + `&units=metric&appid=` + API_KEY

    fetch(api).then(response => response.json()).then(result => setInformation(result));

}

//Function to get data from the API when we first load the page (we don't have a city so set a default city).
function getOriginalWeather(city) {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=` + city + `&units=metric&appid=` + API_KEY

    fetch(api).then(response => response.json()).then(result => setInformation(result));
}

//Function to set the data and update the HTML page.
function setInformation(data) {
    
    console.log(data);

    //If the city name was invalid don't change anything, otherwise change the innerHTML.
    if (!(data.name === undefined)) {

        document.getElementById("input-box-city").value = data.name;
        document.getElementById("city").innerHTML = "Weather in " + data.name;
        document.getElementById("weatherImg").src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
        document.getElementById("description").innerHTML = data.weather[0].description;
        document.getElementById("temperature").innerHTML = Math.floor(data.main.temp) + "°C";
        document.getElementById("humidity").innerHTML = "Humidity: " + data.main.humidity + "%";
        document.getElementById("wind").innerHTML = "Wind Speed: " + data.wind.speed + " km/h"


    }
}

//Start the page with Ottawa as the default result.
getOriginalWeather("Ottawa");