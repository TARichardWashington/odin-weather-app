const theWeatherDom = document.querySelector('#theWeather');
const locationDom = document.querySelector('#location');
const unitDom = document.querySelector('#unit');
const changeLocationDom = document.querySelector('#changeLocation');

changeLocationDom.addEventListener('click', () => {
    updatePage(locationDom.value, unitDom.value);
})

let currentWeather = {};

async function getWeather(city, units) {
    const weather = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=fcf040bbe19479258400df1fc36a0032' + '&units=' + units, { mode: 'cors' });
    const weatherJson = await weather.json();

    return weatherJson;
}

function setWeather() {
    theWeatherDom.textContent =

        `In ${locationDom.value} the current temperature is ${currentWeather.temp} 
    but with the wind and whatnot it feels like ${currentWeather.feels}. 
    If you were to ask me to describe the weather I would say ${currentWeather.description}.`;
}

function updatePage(location, unit) {
    getWeather(location, unit).then((result) => {
        currentWeather = {
            temp: result.main.temp,
            feels: result.main.feels_like,
            description: result.weather[0].description
        }
        setWeather();
    });

}

updatePage('Norwich', 'metric');

