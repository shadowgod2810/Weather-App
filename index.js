let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_datetime");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");
let w_feelslike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");
let inputCity = document.querySelector(".weather_search");


// for date formatting
const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    // second: "numeric",
  };

// to get actual country name
const getCountry = (code) => {
    return new Intl.DisplayNames([code], {type: 'region' }).of(code);
}

// to get date and day
const getDate = (dt) => {
    const format = new Intl.DateTimeFormat("en-IN", options);
    const date = format.format(dt);
    return date;
}

// convert temp Kelvin to Celsius
const convertKtoC = (temp) => {
    return (temp - 273.15);
}

let city = "pune";

// search functionality
inputCity.addEventListener('submit', (e) => {
    e.preventDefault();
    let cityName = document.querySelector(".city_name");
    // console.log(cityName.value);
    city = cityName.value;
    document.body.addEventListener('load', getWeatherData());
    cityName.value = "";
});

const getWeatherData = async () => {
    
    const weatherUrl =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=3783b549a64046d335f9c196a5868449`;

    try {
        const res = await fetch(weatherUrl);
        const data = await res.json();

        // console.log(data);

        const {main, name, weather, wind, sys, dt} = data;

        cityName.innerHTML = `${name}, ${getCountry(sys.country)}`;
        console.log(name, getCountry(sys.country));
        dateTime.innerHTML = `${getDate(dt*1000)}`;

        w_forecast.innerHTML = weather[0].main;
        w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`

        w_temperature.innerHTML = `${convertKtoC(main.temp).toFixed(2)}&#176C`
        w_minTem.innerHTML = `min : ${convertKtoC(main.temp_min).toFixed(2)}&#176C`;
        w_maxTem.innerHTML = `max : ${convertKtoC(main.temp_max).toFixed(2)}&#176C`;

        w_feelslike.innerHTML = `${convertKtoC(main.feels_like).toFixed(2)}&#176C`;
        w_humidity.innerHTML = `${main.humidity}%`
        w_wind.innerHTML = `${wind.speed} m/s`;
        w_pressure.innerHTML = `${main.pressure} hPa`;
    } catch (error) {
        console.log(error);
    }
}


document.body.addEventListener("load", getWeatherData());
