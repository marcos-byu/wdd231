// OpenWeatherMap - São Paulo
const apiKey = "5d9a17ea59c8000c6d660fe443172cec";
const lat = -23.55;
const lon = -46.63;

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

const currentTemp = document.querySelector("#current-temp");
const weatherNow = document.querySelector("#weather-now");
const weatherDesc = document.querySelector("#weather-desc");
const forecastList = document.querySelector("#forecast");

async function getWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) {
            throw new Error("Could not load the weather");
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherDesc.textContent = "Weather not available";
    }
}

function displayWeather(data) {
    currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;C`;
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const weatherIcon = document.createElement("img");
    weatherIcon.setAttribute("src", icon);
    weatherIcon.setAttribute("alt", data.weather[0].description);
    weatherIcon.setAttribute("width", "80");
    weatherIcon.setAttribute("height", "80");
    weatherNow.prepend(weatherIcon);
    weatherDesc.textContent = data.weather[0].description;
}

async function getForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) {
            throw new Error("Could not load the forecast");
        }
        const data = await response.json();
        displayForecast(data.list);
    } catch (error) {
        forecastList.innerHTML = "<li>Forecast not available</li>";
    }
}

function displayForecast(list) {
    // the API gives data every 3 hours, so I get only the 12:00 ones
    const days = list.filter((item) => item.dt_txt.includes("12:00:00"));

    days.slice(0, 3).forEach((day) => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

        const li = document.createElement("li");
        li.innerHTML = `${dayName}: <strong>${Math.round(day.main.temp)}&deg;C</strong>`;
        forecastList.appendChild(li);
    });
}

getWeather();
getForecast();
