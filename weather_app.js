const locationKey = '43788e0bca2e14a2ec9224a88748f3a6'
const weatherKey = 'f4e8e5a8c366eefce00225f9889573b6'

const formData = document.querySelector('#form-data')
formData.addEventListener('submit', (event) => {
    event.preventDefault()
    const city = formData.city.value
    const state = formData.state.value
    const country = formData.country.value
    getLatLon(city, state, country)
})

async function getLatLon(city, state, country){
    url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=1&appid=43788e0bca2e14a2ec9224a88748f3a6`
    const response = await fetch(url)
    const data = await response.json()
    const lat = data['0'].lat
    const lon = data['0'].lon
    getWeather(lat, lon)
}

// Making the queried data available at a global scope
let data = []

async function getWeather(lat, lon){
    url =`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=43788e0bca2e14a2ec9224a88748f3a6`
    const response = await fetch(url)
    data = await response.json()
    // Parse through data and assign variables
    let currentTemp = data.current.temp
    let feelsLike = data.current.feels_like
    let humidity = data.current.humidity
    let highTemp = data.daily['0'].temp.max
    let lowTemp = data.daily['0'].temp.min
    let currentDescription = data.current.weather[0].main
    let icon = data.current.weather[0].icon
    let currentTime = data.current.dt
    console.log(data)
    backgroundChange(currentDescription)

    // Create a card generated with current weather details
    const displayWeatherCurrent = document.querySelector('.displayWeatherCurrent')
    displayWeatherCurrent.innerHTML = `
    <div class="card" style="width: 18rem;">
        <i class="${changeIcon(currentDescription)}" style="font-size: 10em; text-align: center;"></i>
        <div class="card-body">
            <h1 class="card-title">${currentTemp}&degC</h1>
            <h3 class="card-sub-title">${currentDescription}</h3>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Feels Like: ${feelsLike}&degC</li>
            <li class="list-group-item">Humidity: ${humidity}%</li>
            <li class="list-group-item">High: ${highTemp}&degC</li>
            <li class="list-group-item">Low: ${lowTemp}&degC</li>
        </ul>
        <div class="card-body" id="next-day">
            <button type="submit" class="btn btn-primary card-btn" onclick="nextDay(data)" >Next Day</button>
        </div>
    </div>
    `
    // Display hourly weather data from current time through 48hrs
    let hourly = ``
    for (index in data.hourly){
        if (data.hourly[index].dt >= currentTime){
            hourly += `
        <div class="card card-hourly" style="width: 18rem;">
            <div class="card-body card-body-hourly">
                <i class="${changeIcon(data.hourly[index].weather[0].main)}" style="font-size: 6em;"></i>
                <div class="card-text">
                    <h3>${data.hourly[index].temp}&degC</h1>
                    <h4>${data.hourly[index].weather[0].main}</h1>
                    <h4>${timeOfDay(data.hourly[index].dt)}</h1>
                </div>
            </div>
        </div>
    `
        }
    }
    // Query to show hourly data
    const displayHourly = document.querySelector('.displayHourly')
    displayHourly.innerHTML = hourly
    
}

// Section for generating the card and actions for the buttions to show the next day or previous day
function nextDay(data){
    const displayWeatherCurrent = document.querySelector('.displayWeatherCurrent')
    displayWeatherCurrent.innerHTML = `
    <div class="card" style="width: 18rem;">
        <i class="${changeIcon(data.daily[1].weather[0].main)}" style="font-size: 10em; text-align: center;"></i>
        <div class="card-body">
            <h1 class="card-title">${data.daily[1].temp.day}&degC</h1>
            <h3 class="card-sub-title">${data.daily[1].weather[0].main}</h3>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Feels Like: ${data.daily[1].feels_like.day}&degC</li>
            <li class="list-group-item">Humidity: ${data.daily[1].humidity}%</li>
            <li class="list-group-item">High: ${data.daily[1].temp.max}&degC</li>
            <li class="list-group-item">Low: ${data.daily[1].temp.min}&degC</li>
        </ul>
        <div class="card-body" id="next-day">
            <button type="submit" class="btn btn-primary card-btn" onclick="previousDay(data)">Previous</button>
            <button type="submit" class="btn btn-primary card-btn" onclick="nextDay1(data)">Next</button>
        </div>
    </div> 
    `
}

function nextDay1(data){
    const displayWeatherCurrent = document.querySelector('.displayWeatherCurrent')
    displayWeatherCurrent.innerHTML = `
    <div class="card" style="width: 18rem;">
        <i class="${changeIcon(data.daily[2].weather[0].main)}" style="font-size: 10em; text-align: center;"></i>
        <div class="card-body">
            <h1 class="card-title">${data.daily[2].temp.day}&degC</h1>
            <h3 class="card-sub-title">${data.daily[2].weather[0].main}</h3>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Feels Like: ${data.daily[2].feels_like.day}&degC</li>
            <li class="list-group-item">Humidity: ${data.daily[2].humidity}%</li>
            <li class="list-group-item">High: ${data.daily[2].temp.max}&degC</li>
            <li class="list-group-item">Low: ${data.daily[2].temp.min}&degC</li>
        </ul>
        <div class="card-body" id="next-day">
            <button type="submit" class="btn btn-primary card-btn" onclick="previousDay1(data)">Previous</button>
        </div>
    </div> 
    `
}

function previousDay(data){
    const displayWeatherCurrent = document.querySelector('.displayWeatherCurrent')
    displayWeatherCurrent.innerHTML = `
    <div class="card" style="width: 18rem;">
        <i class="${changeIcon(data.current.weather[0].main)}" style="font-size: 10em; text-align: center;"></i>
        <div class="card-body">
            <h1 class="card-title">${data.current.temp}&degC</h1>
            <h3 class="card-sub-title">${data.current.weather[0].main}</h3>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Feels Like: ${data.current.feels_like}&degC</li>
            <li class="list-group-item">Humidity: ${data.current.humidity}%</li>
            <li class="list-group-item">High: ${data.daily['0'].temp.max}&degC</li>
            <li class="list-group-item">Low: ${data.daily['0'].temp.min}&degC</li>
        </ul>
        <div class="card-body" id="next-day">
            <button type="submit" class="btn btn-primary card-btn" onclick="nextDay(data)">Next Day</button>
        </div>
    </div> 
    `
}
function previousDay1(data){
    const displayWeatherCurrent = document.querySelector('.displayWeatherCurrent')
    displayWeatherCurrent.innerHTML = `
    <div class="card" style="width: 18rem;">
        <i class="${changeIcon(data.daily[1].weather[0].main)}" style="font-size: 10em; text-align: center;"></i>
        <div class="card-body">
            <h1 class="card-title">${data.daily[1].temp.day}&degC</h1>
            <h3 class="card-sub-title">${data.daily[1].weather[0].main}</h3>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Feels Like: ${data.daily[1].feels_like.day}&degC</li>
            <li class="list-group-item">Humidity: ${data.daily[1].humidity}%</li>
            <li class="list-group-item">High: ${data.daily[1].temp.max}&degC</li>
            <li class="list-group-item">Low: ${data.daily[1].temp.min}&degC</li>
        </ul>
        <div class="card-body" id="next-day">
            <button type="submit" class="btn btn-primary card-btn" onclick="previousDay(data)">Previous</button>
            <button type="submit" class="btn btn-primary card-btn" onclick="nextDay1(data)">Next</button>
        </div>
    </div> 
    `
}

// Function to convert unix UCT to the current time on location
// Displays in 24hr time format
function timeOfDay(time){
    // multiply by 1000 to change the time to miliseconds
    let date = new Date((time) * 1000)
    // use built in methods to extract the information
    let hours = date.getHours()
    let minutes = "0" + date.getMinutes()
    let seconds = "0" + date.getSeconds()
    // format the result
    let finalTime = hours + ':' + minutes + ':' + seconds
    return finalTime
}

// Function for changing the background
function backgroundChange(currentDescription){
    switch (currentDescription){
        case "Clear":
            document.querySelector('body').style.backgroundImage =
            "url('images/sunny.jpeg')"
            break
        case "Clouds":
            document.querySelector('body').style.backgroundImage =
            "url('images/cloudy.jpeg')"
            break
        case "Rain":
            document.querySelector('body').style.backgroundImage =
            "url('images/rain.jpeg')"
            break
        case "Rain":
            document.querySelector('body').style.backgroundImage =
            "url('images/rain.jpeg')"
            break
        case "Snow":
            document.querySelector('body').style.backgroundImage =
            "url('images/snowing.jpeg')"
            break
        case "Fog":
            document.querySelector('body').style.backgroundImage =
            "url('images/fog.jpeg')"
            break
        case "Thunderstorm":
            document.querySelector('body').style.backgroundImage =
            "url('images/thunderstorm.jpeg')"
            break
        default:
            document.querySelector('body').style.backgroundImage =
            "url('images/sunny.jpeg')"
            break
    }
}

// Function for changing the icons
function changeIcon(currentDescription){
    switch (currentDescription){
        case "Clear":
            return "bi bi-sun"
            break
        case "Clouds":
            return "bi bi-clouds"
            break
        case "Rain":
            return "bi bi-cloud-rain"
            break
        case "Drizzle":
            return "bi bi-cloud-drizzle"
            break
        case "Snow":
            return "bi bi-cloud-snow"
            break
        case "Fog":
            return "bi bi-cloud-fog2"
            break
        case "Thunderstorm":
            return "bi bi-cloud-lightning-rain"
            break
        default:
            return "bi bi-sun"
            break
    }
}