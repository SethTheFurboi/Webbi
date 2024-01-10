function fetchLocationData() {
    fetch('https://ipinfo.io/json?token=7123ef64da11b7')
        .then(response => response.json())
        .then(data => {

            console.log(data)
          
            // const locationInfo = document.getElementById('locationInfo');
            // locationInfo.innerHTML = `
            //     <h1>Your Location Information</h1>
            //     <p><strong>IP:</strong> ${data.ip}</p>
            //     <p><strong>City:</strong> ${data.city}</p>
            //     <p><strong>Region:</strong> ${data.region}</p>
            //     <p><strong>Country:</strong> ${data.country}</p>
            //     <p><strong>Location:</strong> ${data.loc}</p>
            // `;

            var LatAndLong = data.loc.split(",")

            fetchWeatherData(LatAndLong[0],LatAndLong[1])

        })
        .catch(error => {

            console.error('Error fetching location data:', error)

        })
}
window.onload = fetchLocationData;

var BgImages = {
    Snow: "Snowy.png",
    Rain: "Rainy.png",
}


function fetchWeatherData(Lat, Long) {
    const apiKey = '6c80a9eb6cc84c6814a3ce34cdffcaa0';

    var GetWeatherURL = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + Lat + '&lon=' + Long + '&appid=' + apiKey + '&units=imperial'



    fetch(GetWeatherURL)
        .then(response => response.json())
        .then(data => {

            console.log(data.list[0])

            var CurrWeather = data.list[0].weather[0].main

            console.log(CurrWeather)

            if (BgImages[CurrWeather]) {
                console.log("HEY LOOK IT FUCKIN' WORKED!")

                var ElementToChange = document.getElementById("weather-bg")

                console.log(ElementToChange)

                ElementToChange.style = "background-image: url('/assets/Scenes/" + BgImages[CurrWeather] + "');"


            } else {
                console.log("Seth you fucking idiot look what you've done")
            }

        })
        .catch(error => {
            console.error('Error fetching weather data:', error)
        });
}

// fetchWeatherData('New York');