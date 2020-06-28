let cities = [];

$("#find-city").on("click", function(event) {
    event.preventDefault();
    console.log("find");
    let city = $("#city-input").val();
    getAPIs(city);
});

$("city-list").on("click", ".city", function(event) {
    event.preventDefault();
});

$("#clear-city-names").on("click", function() {
    cities = [];
    saveCitites();
    renderCities();
})

function getAPIs(city) {
    console.log(city)
    const APIkey = "42ac96ee87f578a00e089e22a9c3b479";
    let fiveDayQueryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city},us&units=imperial&appid=${APIkey}`;
    let mainQueryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},us&units=imperial&appid=${APIkey}`;

    $.ajax({
        url: fiveDayQueryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        showFiveDayWeather(response);
    })

    $.ajax({
        url: mainQueryURL,
        mthod: "GET"
    }).then(function(response) {
        showMainWeather(response);
    })

    if (cities.indexOf(city) === -1) {
        cities.push(city);
    }

    saveCities();
    renderCities();
};

function init(){
    let storedCities = JSON.parse(localStorage.getItem("cities"));

    if (storedCities !== null) {
        cities = storedCities;
    }
}

function saveCities() {
    localStorage.setItem("cities", JSON.stringify(cities));
}

function showMainWeather(response) {
    let cityName = response.name;
    let cityDate = moment().format('l');
    let cityIcon = response.weather[0].icon;
    let cityTemp = Math.round(response.main.temp);
    let cityHum = response.main.humidity;
    let cityWind = Math.round(response.wind.speed);
    let cityCondition = response.weather[0].main;
    let cityIconEl = $("<img>").attr("src", `https://openweathermap.org/img/w/${cityIcon}.png`)
    $("#city-name").text(cityName + ' (' + cityDate + ')').append(cityIconEl); 
    $("#city-temp").text(cityTemp);
    $("#city-hum").text(cityHum);
    $("#city-wind").text(cityWind);
    $("#city-condition").text(cityCondition);
}

function showFiveDayWeather(response) {
    $("#five-day-deck").empty();
    for (let i = 0; 1 <40; i +=8) {
        let cardDate = response.list[i].dt_txt;
        let date = new Date(cardDate).toLocaleDateString('en-US', {
            day : 'numeric',
            month : 'numeric',
            year : 'numeric'
        });
        let cardTemp = Math.round(response.list[i].main.temp);
        let cardHum = Math.round(response.list[i].main.humidity);
        let iconSource = response.list[i].weather[0].icon;
        
        let cardEl = $("<div>").attr("class", "card");
        let cardBodyEl = $("<div>").attr("class", "card-body five-card");
        let cardTitleEl = $("<h6>").attr("class", "card-title").text(date);
        let cardIcon = $("<img>").attr("src", `https://openweathermap.org/img/w/${iconSource}.png`);
        let cardTempEl = $("<p>").attr("class", "card-text").text(`Temp: ${cardTemp} F`);
        let cardHumEl = $("<p>").attr("class", "card-text").text(`Humidity; ${cardHum}%`);
        cardEl.append(cardBodyEl);
        cardBodyEl.append(cardTitleEl).append(cardIcon).append(cardTempEl).append(cardHumEl);
        $("#five-day-deck").append(cardEl);
    }
}

function renderCities() {
    $("#city-list").empty();
    cities.forEach(city => {
        let cityCard = $("<div>").attr("class", "card");
        let cityCardBody = $("<div>").attr("class", "card-body city").text(city);
        cityCard.append(cityCardBody);
        $("#city-list").prepend(cityCard);
    })
}

init();
// function initPage() {
//     const inputEl = document.getElementById("city-input");
//     const searchEl = document.getElementById("search-button");
//     const clearEl = document.getElementById("clear-history");
//     const nameEl = document.getElementById("city-name");
//     const currentImgEl = document.getElementById("current-img");
//     const currentTempEl = document.getElementById("temperature");
//     const currentHumEl = document.getElementById("humidity");
//     const currentWindEl = document.getElementById("wind-speed");
//     const currentUVEl = document.getElementById("UV-index");
//     const historyEl = document.getElementById("history");
//     let searchHistory = JSON.parse(local.Storage.getItem("search")) || [];
//     console.log(searchHistory);

//     const APIkey = "42ac96ee87f578a00e089e22a9c3b479";

//     function getWeather(cityName) {
//         let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" +APIkey;
//         axios.get(queryURL)
//         .then(function (response) {
//             console.log(response);
//             const currentDate = new Date(response.data.dt*1000);
//             console.log(currentDate);
//             const day = currentDate.getDate();
//             const month = currentDate.getMonth() + 1;
//             const year = currentDate.getFullYear();
//             nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ")";
//             let weatherImg = response.data.weather[0].icon;
//             currentImgEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
//             currentImgEl.setAttribute("alt", response.data.weather[0].description);
//             currentTempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + "&#176F";
//             currentHumEl.innerHTML = "Humidity: " + response.data.main.humdity + " mph";
//             let lat = response.data.coord.lat;
//             let lon = response.data.coord.lon;
//             let UVIndex = document.createElement("span");
//             UVIndex.setAttribute("class", "badge badge-danger");
//             UVIndex.innerHTML = response.data[0].value;
//             currentUVEl.innerHTML = "UV Index: ";
//             currentUVEl.append(UVIndex);
//         });

//         let cityID = response.data.id;
//         let forcastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid" + APIkey;
//         axios.get(forcastQueryURL)
//         .then(function(response) {
//             console.log(response);
//             const forecastEls = document.querySelectorAll(".forecast");
//             for (i=0; i<forecastEls.length; i++) {
//                 const forecastIndex = 1*8 + 4;
//                 const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
//                 const forecaseDay = forecastDate.getDate();
//                 const forecastMonth = forecastDate.getMonth() + 1;
//                 const forecastYear = forecastDate.getFullYear();
//                 const forecastDateEl = document.createElement("p");
//                 forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
//                 forecastDateEl.innerHTML = forecastMonth + "/" + forecaseDay + "/" + forecastYear;
//                 forecastEls[i].append(forecastDateEl);
//                 const forecastWeatherEl = document.createElement("img");
//                 forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
//                 forecastWeatherEl.setAttribute("alt", response.data.list[forecastIndex].weather[0].description);
//                 forecastEls[i].append(forecastWeatherEl);
//                 const forecastTempEl = document.createElement("p");
//                 forecastTempEl.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + "&#176F";
//                 forecastEls[i].append(forecastTempEl);
//                 const forecastHumEl = document.createElement("p");
//                 forecastHumEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humdity + "%";
//                 forecastEls[i].append(forecastHumEl);
//             }
//         })
//     };
// }

// searchEl.addEventListener("click", function() {
//     const searchTerm = inputEl.value;
//     getWeather(searchTerm);
//     searchHistory.push(searchTerm);
//     localStorage.setItem("search", JSON.stringify(searchHistory));
//     renderSearchHistory();
// })

// clearEl.addEventListener("click", function() {
//     searchHistory = [];
//     renderSearchHistory();
// })

// function k2f(K) {
//     return Math.floor((K - 273.15) * 1.8 + 32);
// }

// function renderSearchHistory() {
//     historyEl.innerHTML = "";
//     for (let i=0; i<searchHistory.length; i++) {
//         const historyItem = document.createElement("input");
//         historyItem.setAttribute("type", "text");
//         historyItem.setAttribute("readonly", true);
//         historyItem.setAttribute("class", "form-control d-block bg-white");
//         historyItem.setAttribute("value", searchHistory[i]);
//         historyItem.addEventListener("click", function() {
//             getWeather(historyItem.value);
//         })
//         historyEl.append(historyItem);
//     }
// }

// renderSearchHistory();
// if (searchHistory.length > 0) {
//     getWeather(searchHistory[searchHistory.length - 1]);
// }

// initPage();


