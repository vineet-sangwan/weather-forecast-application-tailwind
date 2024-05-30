function getCurrentLocationWeather() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const apiKey = 'ff4156d4b6086d821cf3d6df9b43422b';
          const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
          const forcast5day = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
          

          try {
              const response = await fetch(apiUrl);
              const data = await response.json();
              const fiveres = await fetch(forcast5day);
              const fivedata = await fiveres.json();
              console.log(fivedata);
              console.log(data);
              const city = data.name;
              const temp = `Temperature : ${data.main.temp}`;
              const humi = `Humidity : ${data.main.humidity}`;
              const wind = `Wind : ${data.wind.speed}`;
              document.getElementById('currentLocationWeather').textContent = city;
              document.getElementById('temperature').textContent = temp;
              document.getElementById('humidity').textContent = humi;
              document.getElementById('wind').textContent = wind;
              const firstFiveData = fivedata.list.slice(0, 5);
              console.log(firstFiveData);
              const htmlContent = `
              ${firstFiveData.map(item => `
                <div>
                  <div class="bg-blue-500 text-white w-full m-7 p-10">
                    <div class="my-3 font-bold text-xl">${getFormattedDate(item.dt_txt)}</div>
                    <div class="my-3">Temperature : ${item.main.temp}</div>
                    <div class="my-3">Humidity : ${item.main.humidity}</div>
                    <div class="my-3">Wind Speed :${item.wind.speed}</div>
                    <div class="my-3">Pressure : ${item.main.pressure}</div>
                  </div>
                </div>
                `).join('')}
            `;
            document.getElementById('dataContainer').innerHTML = htmlContent;
            function getFormattedDate(dateStr) {
              const date = new Date(dateStr);
              return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
            }
          } catch (error) {
              console.error('Error fetching current location weather:', error);
          }
      });
  } else {
      console.error('Geolocation is not supported by this browser.');
  }
}

// Function to search weather by city name
async function searchWeather() {
const city = document.getElementById('searchInput').value;
const apiKey = 'ff4156d4b6086d821cf3d6df9b43422b';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    const lati = data.coord.lat;
    const longi = data.coord.lon;
    const forcastresp = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lati}&lon=${longi}&appid=${apiKey}`);
    const forcastdata = await forcastresp.json();
    console.log(forcastdata);
    const firstFiveDatasearch = forcastdata.list.slice(0, 5);
    console.log(firstFiveDatasearch)
    const city = data.name;
    const temp = `Temperature : ${data.main.temp}`;
    const humi = `Humidity : ${data.main.humidity}`;
    const wind = `Wind : ${data.wind.speed}`;
    document.getElementById('currentLocationWeather').textContent = city;
    document.getElementById('temperature').textContent = temp;
    document.getElementById('humidity').textContent = humi;
    document.getElementById('wind').textContent = wind;
    const htmlContent = `
    ${firstFiveDatasearch.map(item => `
      <div>
        <div class="bg-blue-500 text-white m-7 p-10">
          <div class="my-3 font-bold text-xl">${getFormattedDate(item.dt_txt)}</div>
          <div class="my-3">Temperature : ${item.main.temp}</div>
          <div class="my-3">Humidity : ${item.main.humidity}</div>
          <div class="my-3">Wind Speed :${item.wind.speed}</div>
          <div class="my-3">Pressure : ${item.main.pressure}</div>
        </div>
      </div>
      `).join('')}
  `;
  document.getElementById('dataContainer').innerHTML = htmlContent;
  function getFormattedDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }
} catch (error) {
    console.error('Error fetching weather for searched location:', error);
}
}

window.onload = getCurrentLocationWeather;