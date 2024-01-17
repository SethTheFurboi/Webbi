function fetchLocationData() {
     fetch('https://ipinfo.io/json?token=7123ef64da11b7')
         .then(response => response.json())
         .then(data => {

             var LatAndLong = data.loc.split(",")

             fetchWeatherData(LatAndLong[0],LatAndLong[1])

         })
         .catch(error => {

             console.error('Error fetching location data:', error)

         })

    // fetchWeatherData(20,160)

}
window.onload = fetchLocationData;

var BgImages = {
    Snow: "Snowy.png",
    Rain: "Rainy.png",
    Clouds: "Cloudy.png",
    Sunny: "Sunny.png",
}

var DetectedWeather = "NO WEATHER SET"

var CurrDay = 0


function fetchWeatherData(Lat, Long) {
    const apiKey = '6c80a9eb6cc84c6814a3ce34cdffcaa0';

    var GetWeatherURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + Lat + '&lon=' + Long + '&appid=' + apiKey + '&units=imperial'



    fetch(GetWeatherURL)
        .then(response => response.json())
        .then(data => {

            var CurrWeather = data.list[CurrDay].weather[0].main

            console.log(CurrWeather)
            DetectedWeather = CurrWeather

            var ElementToChange = document.getElementById("weather-bg")


            if (BgImages[CurrWeather]) {

                ElementToChange.style = "background-image: url('/assets/Scenes/" + BgImages[CurrWeather] + "');"


            } else {

                ElementToChange.style = "background-image: url('/assets/Scenes/" + BgImages.Sunny + "');"
            }

        })
        .catch(error => {
            console.error('Error fetching weather data:', error)
        });
}

var ActualPet = document.getElementById("da-boi")
var ActualPetImage = document.getElementById("pet-image")
var PetOptions = document.getElementById("pet-actions")
var FeedButton = document.getElementById("feed")
var BrushButton = document.getElementById("brush")
var PetButton = document.getElementById("pet")

ActualPet.addEventListener("click", function(event) {

    var Classes = PetOptions.classList
    // Classes.toggle("invisible")

    var CurLoopCount = 0
    var MaxLoopCount = 10
    var UpdateTime = 10

    if (Classes.contains("opacity-0")) {

        var timeInterval = setInterval(function () {

            var OldTrans = CurLoopCount
            
            CurLoopCount += 1

            var NewTrans = CurLoopCount

            if (CurLoopCount <= MaxLoopCount) {

                Classes.replace("opacity-"+(OldTrans*10),"opacity-"+(NewTrans*10))


            } else {

                clearInterval(timeInterval)

            }
        
        }, UpdateTime);

    } else {

        var timeInterval = setInterval(function () {

            var OldTrans = MaxLoopCount - CurLoopCount
            
            CurLoopCount += 1

            var NewTrans = MaxLoopCount - CurLoopCount

            if (CurLoopCount <= MaxLoopCount) {

                Classes.replace("opacity-"+(OldTrans*10),"opacity-"+(NewTrans*10))


            } else {

                clearInterval(timeInterval)

            }
        
        }, UpdateTime);   

    }

})

var HappText = document.getElementById("happy-text")
var HungryText = document.getElementById("hunger-text")

// Get pet data

var PetStats = localStorage.getItem('PetStats');

if (PetStats) {

    PetStats = JSON.parse(PetStats)

} else {

    PetStats = {
        Hunger: 50,
        Happiness: 50
    }
    
}

var GlobalButtonCooldown = false

var AdjustStats = function(Hung, Hap) {

    PetStats.Hunger = Math.min(100,Math.max(0,PetStats.Hunger + (Hung || 0)))
    PetStats.Happiness = Math.min(100,Math.max(0,PetStats.Happiness + (Hap || 0))) 

    if (GlobalButtonCooldown == false) {

        UpdateImage()

    }

    HappText.textContent = "HAPPINESS: " + PetStats.Happiness + "/100"
    HungryText.textContent = "HUNGER: " + PetStats.Hunger + "/100"

    localStorage.setItem('PetStats', JSON.stringify(PetStats))

}

var PossiblePetSprites = [
    {
    RequiredHunger: 75,
    RequiredHappi : 75,
    ActualImage: "AlobeatBeansGoBrrr.png"
    },
    {
        RequiredHunger: 50,
        RequiredHappi : 50,
        ActualImage: "sethpopcorn.png"
    },
    {
        RequiredHunger: 1,
        RequiredHappi : 1,
        ActualImage: "FakU.png"
    },
    {
        RequiredHunger: 0,
        RequiredHappi : 0,
        ActualImage: "deadseth.png"
    },
    
]

var UpdateImage = function() {

    // ActualPetImage.src = "./assets/Sprites/AlobeatBeansGoBrrr.png"
    var FoundCurrMood = false

    for (var i = 0; i < PossiblePetSprites.length; i++) {

        if (FoundCurrMood) {
            break
        }

        if (PetStats.Hunger >= PossiblePetSprites[i].RequiredHunger && PetStats.Happiness >= PossiblePetSprites[i].RequiredHappi) {

            FoundCurrMood = true
            ActualPetImage.src = "./assets/Sprites/" + PossiblePetSprites[i].ActualImage
    
        }
    
      } 

}

// Updates the text, because I'm too lazy to call two functions -Seth
AdjustStats()

function GlobalCD() {

    GlobalButtonCooldown = true

    var OrigCDTime = 1
    var CDTime = OrigCDTime

    var timeInterval = setInterval(function () {

        if (CDTime <= OrigCDTime) {
            UpdateImage()
        }
        
        CDTime -= 1

        if (CDTime <= 0) {

        GlobalButtonCooldown = false    
        clearInterval(timeInterval)

        }
    
    }, 1000);

}

FeedButton.addEventListener("click", function(event) {

    var Classes = FeedButton.classList

    if (Classes.contains("opacity-100") && GlobalButtonCooldown == false) {

        GlobalCD()

        AdjustStats(10)

        Classes.toggle("opacity-100")
        Classes.toggle("opacity-50")

        ActualPetImage.src = "./assets/Sprites/popseth.gif"

        var CDTime = 2

        var timeInterval = setInterval(function () {
            
            CDTime -= 1

            if (CDTime <= 0) {

                
            Classes.toggle("opacity-50")
            Classes.toggle("opacity-100")
            clearInterval(timeInterval)

            }
        
        }, 1000);

    }

})   

BrushButton.addEventListener("click", function(event) {

    var Classes = BrushButton.classList

    if (Classes.contains("opacity-100") && GlobalButtonCooldown == false) {

        GlobalCD()

        AdjustStats(0,((DetectedWeather == "Rain" && 20) || 7))

        Classes.toggle("opacity-100")
        Classes.toggle("opacity-50")

        ActualPetImage.src = "./assets/Sprites/SethToothbrush.gif"

        var CDTime = 2

        var timeInterval = setInterval(function () {
            
            CDTime -= 1

            if (CDTime <= 0) {

                
            Classes.toggle("opacity-50")
            Classes.toggle("opacity-100")
            clearInterval(timeInterval)

            }
        
        }, 1000);

    }

})  

PetButton.addEventListener("click", function(event) {

    var Classes = PetButton.classList

    if (Classes.contains("opacity-100") && GlobalButtonCooldown == false) {

        GlobalCD()

        AdjustStats(0,10)

        Classes.toggle("opacity-100")
        Classes.toggle("opacity-50")

        ActualPetImage.src = "./assets/Sprites/petdaseth.gif"

        var CDTime = 2

        var timeInterval = setInterval(function () {
            
            CDTime -= 1

            if (CDTime <= 0) {

                
            Classes.toggle("opacity-50")
            Classes.toggle("opacity-100")
            clearInterval(timeInterval)

            }
        
        }, 1000);

    }

}) 

// Depletes stats overtime, set "Deplete Time" to the amount of seconds you want it to update with

var StatDepletetime = 1
var SecUpdate = 10
var TimeElapsed = 0

setInterval(function () {

    TimeElapsed += 1
    // console.log(TimeElapsed)

    AdjustStats(-1,-2)

    if (TimeElapsed%SecUpdate == 0) {

        if (TimeElapsed/SecUpdate >= 40) {

            TimeElapsed = 0
            CurrDay = 0
            
        } else {

            CurrDay = TimeElapsed/SecUpdate

        }
        fetchLocationData()

    }

}, StatDepletetime * 1000);