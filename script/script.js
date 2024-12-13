//VARSSSSSSSSS
const findLocation = document.getElementById('findLocation');
const currentWeather = document.getElementById('current');
const tomorrowWeather = document.getElementById('tomorow-Content');
const afterTomorrowWeather = document.getElementById('afterTommorowContent');
const windDirectionMap = {
    N: "North",
    NE: "Northeast",
    E: "East",
    SE: "Southeast",
    S: "South",
    SW: "Southwest",
    W: "West",
    NW: "Northwest",
    NNE: "North-Northeast",
    ENE: "East-Northeast",
    ESE: "East-Southeast",
    SSE: "South-Southeast",
    SSW: "South-Southwest",
    WSW: "West-Southwest",
    WNW: "West-Northwest",
    NNW: "North-Northwest"
};

// DEFAULT LOADINGSSSSS
getData('Cairo')
createDays()


// EVENTSSSSSS
findLocation.addEventListener("keyup", () => {
    if (findLocation.value.trim() !== "") {
        getData(findLocation.value.trim());
    }
});

// FUNCTIONSSSSSSSSSSSS
async function getData(location) {
    try {
        let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=cb8910f52d914b2e91d233127241012&q=${location}&days=3&aqi=no&alerts=no`);
        if (response.ok) {
        let data = await response.json();
        displayWeather(data);
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

function displayWeather(data) {
    const iconUrl = `https:${data.current.condition.icon}`;
    const windDirectionFull = windDirectionMap[data.current.wind_dir];
// TODAYYYYYYYYYY
    let currentBox = `
        <div class="location py-3">
            ${data.location.name}
        </div>
        <div class="degree d-flex align-items-center">
            <div class="num">
                ${data.current.temp_c}<sup>o</sup>C
            </div>
            <div class="weather-icon">
                <img src="${iconUrl}" width="90" alt="${data.current.condition.text}">
            </div>
        </div>
        <div class="custom"> ${data.current.condition.text} </div>
        <div class="d-flex ">
            <span class="px-2"> <img src="./images/icon-umberella.png" width="21" height="21" alt="umbrella">
                ${data.current.humidity}%</span>
            <span class="px-2"> <img src="./images/icon-wind.png" alt="wind" width="23" height="21">
                ${data.current.wind_kph} km/h
            </span>
            <span class="px-2">
                <img src="./images/icon-compass.png" width="21" height="21" alt="compass">
                ${windDirectionFull}
            </span>
        </div>
    `;
    currentWeather.innerHTML = currentBox;

// NEXT DAYYYYYYYY
   let tomorrow = data.forecast.forecastday[1];
   let tomorrowIconUrl = `https:${tomorrow.day.condition.icon}`;
   const tomorrowWindDirectionFull = windDirectionMap[tomorrow.day.maxwind_dir];

   let  tomorrowBox = `
       <div class="weather-icon w-25 d-flex justify-content-center py-2">
           <img src="${tomorrowIconUrl}" class="w-50" alt="${tomorrow.day.condition.text}">
       </div>
       <div class="aftertommorow-num text-white text-center py-2">
           ${tomorrow.day.maxtemp_c}<sup>o</sup>C
           <p>${tomorrow.day.mintemp_c}<sup>o</sup>C</p>
       </div>
       <div class="custom py-2">${tomorrow.day.condition.text}</div>
   `;
   tomorrowWeather.innerHTML = tomorrowBox;
// AFTER NEXTDAYYYYYYYY
   const afterTomorrowData = data.forecast.forecastday[2];
   const afterTomorrowIconUrl = `https:${afterTomorrowData.day.condition.icon}`;
   const afterTomorrowWindDirectionFull = windDirectionMap[afterTomorrowData.day.maxwind_dir];

   const afterTomorrowBox = `
       <div class="weather-icon w-25 d-flex justify-content-center py-2">
           <img src="${afterTomorrowIconUrl}" class="w-50" alt="${afterTomorrowData.day.condition.text}">
       </div>
       <div class="aftertommorow-num text-white text-center py-2">
           ${afterTomorrowData.day.maxtemp_c}<sup>o</sup>C
           <p>${afterTomorrowData.day.mintemp_c}<sup>o</sup>C</p>
       </div>
       <div class="custom py-2">${afterTomorrowData.day.condition.text}</div>
   `;
   afterTomorrowWeather.innerHTML = afterTomorrowBox;
}


function createDays() {
    const today = new Date();
    const daysOfWeek = [
        "Sunday",
         "Monday", 
         "Tuesday", 
         "Wednesday", 
         "Thursday", 
         "Friday", 
         "Saturday"]
    const monthsOfYear = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]
    function getFormattedDate(dateObj) {
        const dayName = daysOfWeek[dateObj.getDay()];
        const day = dateObj.getDate();
        const monthName = monthsOfYear[dateObj.getMonth()];
        const formattedDate = `${day}${monthName}`;
        return { dayName, formattedDate };
    }

    // TODAYYY
    const todayInfo = getFormattedDate(today);
    document.getElementById('today').innerHTML = `
    <div class="day z-3">${todayInfo.dayName}</div>
    <div class="date z-3">${todayInfo.formattedDate}</div>
    `;

    // NEXT DAYY
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowInfo = getFormattedDate(tomorrow);
    document.getElementById('tommorow').innerHTML = `
    <div class="day z-3">${tomorrowInfo.dayName}</div>
     `;
     
    // AFTER NEXTDAYYYY
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);
    const dayAfterTomorrowInfo = getFormattedDate(dayAfterTomorrow);
    document.getElementById('afterTommorow').innerHTML = `
        <div class="day z-3">${dayAfterTomorrowInfo.dayName}</div>
    `;
}



