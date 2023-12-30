let temp;


// Function to be executed on click
function handleClick() {
	//event.preventDefault();
    // Change city name and use name to fetch data
	const inputElement = document.querySelector('.searchInputCity');
	if (inputElement.value !== "" && inputElement.value !== temp ) {	
		cityName = inputElement.value;
		console.log (cityName+ "<--name before function");
		temp = cityName;
		fetchData(cityName);
		console.log (cityName+ "<--name after function");
	}else{
		//alert("Enter a location");
	}
}

// Get the div element by its class name
	const searchDiv = document.querySelector('.home-search');

// Add a click event listener to the div
if (searchDiv) {
	console.log("inside if function");
	searchDiv.addEventListener('click', handleClick());
	} 
	
function fetchData (city) {
//const apiKey = 'ae35ec2f9f983d5fa9a21c085bd025c4';
//apiUrl = `api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=ae35ec2f9f983d5fa9a21c085bd025c4` 

//const apiKey = 'ae35ec2f9f983d5fa9a21c085bd025c4';

// Construct the URL for the API request
apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`;
console.log (apiUrl);
// Make a GET request to the API
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Here, 'data' contains the JSON response from the API
    console.log(data);
    
    // Access specific elements within 'data' and assign them to variables as needed
    longitude = data.coord.lon;
    latitude = data.coord.lat;
	cityName = data.name;
	// Assign the city name to the <p> element
	homeCaptionElement.textContent = cityName;
	console.log(cityName);
	fetchWeatherData();
    /* const weatherDescription = data.weather[0].description;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const sunriseTimestamp = data.sys.sunrise;
    const sunsetTimestamp = data.sys.sunset;
	
	if (temperatureElement) {
		temperatureElement.textContent = `${temperature}°`;
	}
	
	// Assign the city name to the <p> element
	homeCaptionElement.textContent = city;
    
    // You can use these assigned values as needed in your application
    console.log("Longitude:", lon);
    console.log("Latitude:", lat);
    console.log("Weather Description:", weatherDescription);
    console.log("Temperature:", temperature);
    console.log("Humidity:", humidity);
    console.log("Sunrise Timestamp:", sunriseTimestamp);
    console.log("Sunset Timestamp:", sunsetTimestamp); */
  })
  .catch(error => {
    console.error('Error:', error);
  });

}

function populateforcast(forecast, forecastx){
        //declare variables
        let forcastDay;
        const forecastDayValue = formatDateToArrayWithDay(convertUnixTimestampToDateTime(forecast.dt))[3];
        let forecastIcon;
        const forecastIconValue = forecast.weather[0].icon;
        let forecastTemp;
        const forecastTempValue = Math.round(forecast.temp.max);
        let forecastTempLow;
        let forecastTempLowValue = Math.round(forecast.temp.min);
         // set current forcast div
    
        //var selector = '.forecast.' + forecastx;
        //console.log(selector);
        if (forecastx && forecast) {
          let selector = '.forecast.' + forecastx;

          let currentForecastDiv = document.querySelector(selector);
          //let currentForecastDiv = document.querySelector(".forecast.second");

          if (currentForecastDiv) {
            // Corrected variable names
            let daySelect = selector + " .day"; // Updated selector for day
            console.log(daySelect);
            let forecastDay = document.querySelector(daySelect);
            if (forecastDay) {
              forecastDay.textContent = `${forecastDayValue}`;
            }

            let iconSelect = selector + " .forecastIcon"; // Updated selector for icon
            let forecastIcon = document.querySelector(iconSelect);
            if (forecastIcon) {
              forecastIcon.setAttribute('src', `https://openweathermap.org/img/wn/${forecastIconValue}@2x.png`);
            }

            let degreeSelect = selector + " .degreeValue"; // Updated selector for degree
            let forecastTemp = document.querySelector(degreeSelect);
            if (forecastTemp) {
              forecastTemp.textContent = `${forecastTempValue}`;
            }

            console.log(forecastDayValue);

            let degreeLowSelect = selector + " .degreeLowValue"; // Updated selector for degreeLow
            let forecastTempLow = document.querySelector(degreeLowSelect);
            if (forecastTempLow) {
              forecastTempLow.textContent = `${forecastTempLowValue}`;
            }
          }
        }
}
	
	