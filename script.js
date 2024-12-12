const cityInput = document.getElementById('city');
const getWeatherButton = document.getElementById('getWeather');
const weatherInfo = document.getElementById('weatherInfo');

getWeatherButton.addEventListener('click', function() {
    const city = cityInput.value;
    if (city) {
        fetchWeather(city);
    } else {
        weatherInfo.innerHTML = `<p>Please enter a city name.</p>`;
    }
});

function fetchWeather(city) {
    const apiKey = '51940b1791e0f25e81d3d1d7fcdd1691'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.cod === '404') {
                weatherInfo.innerHTML = `<p>City not found. Please try again.</p>`;
            } else if (data.cod === '401') {
                weatherInfo.innerHTML = `<p>Invalid API key. Please check your API key.</p>`;
            } else {
                const temp = data.main.temp;
                const description = data.weather[0].description;
                const location = data.name;

                weatherInfo.innerHTML = `
                    <h2>${location}</h2>
                    <p>${temp}°C</p>
                    <p>${description}</p>
                `;
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherInfo.innerHTML = `<p>Sorry, something went wrong. Please try again later.</p>`;
        });
}
