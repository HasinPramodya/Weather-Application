document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('.btn-warning');
    const locationInput = document.getElementById('Location');
    const weatherInfoDiv = document.getElementById('Current_weatherInfo');
  
    searchButton.addEventListener('click', () => {
      const region = locationInput.value.trim();
  
      if (region) {
        fetchWeather(region);
        fetchWeatherAndForecast(region);
      } else {
        alert('Please enter a location');
      }
    });
  
    function fetchWeather(region) {
      
      fetch(`https://api.weatherapi.com/v1/current.json?key=5a546b46d371405da9b165513242808&q=${region}`)
        .then((res) => res.json())
        .then((data) => {
          updateWeatherInfo(data);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
          alert('Unable to fetch weather data. Please try again.');
        });
    }
  
    function updateWeatherInfo(data) {
      const { location, current } = data;
      const weatherHTML = `
        <h4>${location.name} (${location.localtime.split(' ')[0]})</h4>
        <p>Temp: ${current.temp_c}°C</p>
        <p>Wind: ${current.wind_kph} kph</p>
        <p>Humidity: ${current.humidity}%</p>
        <div class="d-flex justify-content-between align-items-center">
          <p>${current.condition.text}</p>
          <div class="icon">
            <img src="https:${current.condition.icon}" alt="Weather Icon">
          </div>
        </div>
      `;
  
      Current_weatherInfo.innerHTML = weatherHTML;
    }

    function fetchWeatherAndForecast(region) {
        
    
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=5a546b46d371405da9b165513242808&q=${region}&days=7`)
          .then((res) => res.json())
          .then((data) => {
            updateWeatherInfo(data);
            updateForecastInfo(data.forecast.forecastday);
          })
          .catch((error) => {
            console.error('Error fetching weather data:', error);
            alert('Unable to fetch weather data. Please try again.');
          });
      }

      // Update forecast info for 7 days
  function updateForecastInfo(forecastDays) {
    forecastContainer.innerHTML = ''; // Clear previous forecast

    forecastDays.forEach((day) => {
      const forecastHTML = `
        <div class="col-lg-2 col-md-4 col-sm-6 col-6 forecast-day">
          <h6>${day.date}</h6>
          <div class="icon">
            <img src="https:${day.day.condition.icon}" alt="Weather Icon">
          </div>
          <p>Temp: ${day.day.avgtemp_c}°C</p>
          <p>Wind: ${day.day.maxwind_kph} kph</p>
          <p>Humidity: ${day.day.avghumidity}%</p>
          <p>${day.day.condition.text}</p>
        </div>
      `;

      forecastContainer.innerHTML += forecastHTML;
    });
  }
  
  });
  
 
  document.addEventListener('DOMContentLoaded', () => {
    const historicalSearchButton = document.getElementById('historicalSearchBtn');
    const historicalLocationInput = document.getElementById('HistoricalLocation');
    const historicalDateInput = document.getElementById('HistoricalDate');
    const historicalWeatherInfoDiv = document.getElementById('Historical_weatherInfo');

    // Historical weather search event
    historicalSearchButton.addEventListener('click', () => {
        const region = historicalLocationInput.value.trim();
        const date = historicalDateInput.value;

        if (region && date) {
            fetchHistoricalWeather(region, date);
        } else {
            alert('Please enter a location and date');
        }
    });

    // Fetch historical weather data
    function fetchHistoricalWeather(region, date) {
        

        fetch(`http://api.weatherapi.com/v1/history.json?key=5a546b46d371405da9b165513242808&q=${region}&dt=${date}`)
            .then((res) => res.json())
            .then((data) => {
                updateHistoricalWeatherInfo(data);
            })
            .catch((error) => {
                console.error('Error fetching historical weather data:', error);
                alert('Unable to fetch historical weather data. Please try again.');
            });
    }

    // Update historical weather info
    function updateHistoricalWeatherInfo(data) {
        const { location, forecast } = data;
        const weatherHTML = `
            <h4>Historical Weather in ${location.name} (${forecast.forecastday[0].date})</h4>
            <p>Temp (Avg): ${forecast.forecastday[0].day.avgtemp_c}°C</p>
            <p>Wind: ${forecast.forecastday[0].day.maxwind_kph} kph</p>
            <p>Humidity: ${forecast.forecastday[0].day.avghumidity}%</p>
            <div class="d-flex justify-content-between align-items-center">
                <p>${forecast.forecastday[0].day.condition.text}</p>
                <div class="icon">
                    <img src="https:${forecast.forecastday[0].day.condition.icon}" alt="Weather Icon">
                </div>
            </div>
        `;

        historicalWeatherInfoDiv.innerHTML = weatherHTML;
    }
});
