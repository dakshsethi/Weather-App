const form = document.querySelector('#f');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = form['city'].value;
    console.log(city);
    getWeather(city);
    getWeather1(city).then(data => {
        console.log(data.current);
        console.log(data.hourly[0]);
    })
});

async function getWeather(city){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&apikey=946c870db6ca82b017d54a8aa62c349a`)
        .then(weatherObj => weatherObj.json())
        .then((weatherData) => {
            console.log(weatherData.main.temp);
            // printData(weatherData.main.temp, weatherData.main.feels_like)
        })
        .catch((err) => {
            alert('Server error:', err)
        })
}

async function getWeather1(city) {
    let coords = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&apikey=946c870db6ca82b017d54a8aa62c349a`);
    let data = await coords.json();
    let lon = data.coord.lon;
    let lat = data.coord.lat;

    let response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,daily&appid=946c870db6ca82b017d54a8aa62c349a`);
    let info = await response.json();
    return info;
}

getWeather1('Ajmer').then(data => {
    console.log(data.current);
    console.log(data.hourly);
    console.log(data.hourly[0]);
})