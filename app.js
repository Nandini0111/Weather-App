let currCity = "delhi";
let units = "metric";

let city = document.querySelector('.weatherCity');
let dateTime = document.querySelector('.weatherDateTime');
let weatherForecast = document.querySelector(".weatherForecast");
let weatherTemp = document.querySelector(".weatherTemp");
let weatherIcon = document.querySelector(".weatherIcon");
let weatherMinMax = document.querySelector(".weatherMinMax")
let weatherRealfeel = document.querySelector('.weatherRealfeel');
let weatherHumidity = document.querySelector('.weatherHumidity');
let weatherWind = document.querySelector('.weatherWind');
let weatherPressure = document.querySelector('.weatherPressure');
let btn=document.querySelector('.btn');
let link=document.querySelector('#sheet');

btn.addEventListener('click',()=>{
    if(link.getAttribute('href')==='style.css'){
        link.setAttribute('href','style2.css');
    }else{
        link.setAttribute('href','style.css');
    }
})

document.querySelector(".weatherSearch").addEventListener('submit', e => {
    let search = document.querySelector(".weatherSearchForm");
    e.preventDefault();
    currCity = search.value;
    getWeather();
    search.value = ""
})

document.querySelector(".weatherUnitCelsius").addEventListener('click', () => {
    document.querySelector(".weatherUnitFaren").style.fontSize="1.5rem";
    document.querySelector(".weatherUnitCelsius").style.fontSize="2rem";
    if (units !== "metric") {
        units = "metric"
        getWeather();
    }
})

document.querySelector(".weatherUnitFaren").addEventListener('click', () => {
    document.querySelector(".weatherUnitCelsius").style.fontSize="1.5rem";
    document.querySelector(".weatherUnitFaren").style.fontSize="2rem";
    if (units !== "imperial") {
        units = "imperial"
        getWeather();
    }
})

function convertCode(country) {
    let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    return regionNames.of(country);
}

function convertTimeStamp(timestamp, timezone){
    const convertTimezone = timezone / 3600; // convert seconds to hours 

    const date = new Date(timestamp * 1000);
    
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: `Etc/GMT${convertTimezone}`,
        hour12: true,
    }
    return date.toLocaleString("en-US", options)
}

function getWeather() {
    const API_KEY = "76fc5397b5f49c570803fbc59d89e249";

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            city.innerHTML = `${data.name}, ${convertCode(data.sys.country)}`
            //dateTime.innerHTML = convertTimeStamp(data.dt, data.timezone);
            weatherForecast.innerHTML = `<p>${data.weather[0].main}`
            weatherTemp.innerHTML = `${data.main.temp.toFixed()}&#176`
            weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"/>`
            weatherMinMax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p><p>Max: ${data.main.temp_max.toFixed()}&#176</p>`
            weatherRealfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`
            weatherHumidity.innerHTML = `${data.main.humidity}%`
            weatherWind.innerHTML = `${data.wind.speed} ${units === "imperial" ? "mph" : "m/s"}`
            weatherPressure.innerHTML = `${data.main.pressure} hPa`
        });
}

document.body.addEventListener('load', getWeather());
