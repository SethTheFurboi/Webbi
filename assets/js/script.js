function fetchLocationData() {
    fetch('https://ipinfo.io/[IP address]?token=7123ef64da11b7')
        .then(response => response.json())
        .then(data => {
          
            // const locationInfo = document.getElementById('locationInfo');
            // locationInfo.innerHTML = `
            //     <h1>Your Location Information</h1>
            //     <p><strong>IP:</strong> ${data.ip}</p>
            //     <p><strong>City:</strong> ${data.city}</p>
            //     <p><strong>Region:</strong> ${data.region}</p>
            //     <p><strong>Country:</strong> ${data.country}</p>
            //     <p><strong>Location:</strong> ${data.loc}</p>
            // `;

            fetchWeatherData(data.city)
        })
        .catch(error => {
            console.error('Error fetching location data:', error);
          
            const locationInfo = document.getElementById('locationInfo');
            locationInfo.innerHTML = '<p>Error fetching location data.</p>';
        });
}
window.onload = fetchLocationData;





function fetchWeatherData(city) {
    const apiKey = 'a3d03e21dae3e7499210cb56d3c6f61d';
    const apiUrl = `https://api.openweathermap.org/weather?city=${city}&apikey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
        
            const weatherCode = data.weatherCode;
            
            console.log (weatherCode)

            if (weatherCode === 'rain') {
                document.body.style.backgroundImage = "url('rain.jpg')";
            } else if (weatherCode === 'clear') {
                document.body.style.backgroundImage = "url('clear.jpg')";
            } else {
                document.body.style.backgroundImage = "url('default.jpg')";
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        
            document.body.style.backgroundImage = "url('default.jpg')";
        });
}

// fetchWeatherData('New York');