const apiKey = 'ae35ec2f9f983d5fa9a21c085bd025c4';
let latitude = 51.5098;
let longitude = -0.1180;
let cityName = 'City of Westminster';
let apiUrlcity;
let temperatureElement;
let homeCaptionElement;
let cWeatherDesc;
let cWeatherIcon;
let cHumidity;
let cUVI;
let cClouds;
let cPressure;
let dayOfWeek;
let dateofMonth;
let datedetails;
let windSpeed;

if ("geolocation" in navigator) {
  // Geolocation is available
  (async function() {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      // The user's location is available in the 'position' object
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      // You can use these coordinates in your code
      console.log("Latitude: " + latitude);
      console.log("Longitude: " + longitude);

      apiUrlcity = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=ae35ec2f9f983d5fa9a21c085bd025c4`;

      // Now, you can use these coordinates to make requests to location-based services or display the user's location on a map.
	  // Select the <p> element by its class name
		//homeCaptionElement = document.querySelector('.location');
		apiUrlcity = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${apiKey}`;
		// Make a GET request to the API
		fetch(apiUrlcity)
		  .then(response => response.json())
		  .then(data => {
			// Check if the response contains data
			if (data && data.length > 0) {
			  // Assuming the response is an array of locations, and you want the first one
			  const firstLocation = data[0];
			  
			  // Extract the city name from the location data
			  cityName = firstLocation.name;

			  // Assign the city name to the <p> element
			  //homeCaptionElement.textContent = cityName;
			  
			  // Use the city name as needed (e.g., display it)
			  console.log(`City Name: ${cityName}`);
			  //console.log("apiurl: " + apiUrl)
			} else {
			  console.log('No location data found in the response.');
			}
		  })
		  .catch(error => {
			console.error('Error:', error);
		  });
		
		console.log("before fetchWeatherData");
		fetchWeatherData();

    } catch (error) {
      // Handle errors here, such as when the user denies permission
      console.error("Error getting location: " + error.message);
    }
  })();
} else {
  // Geolocation is not available in this browser
  console.error("Geolocation is not available in this browser.");
}

function fetchWeatherData () {
	const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
		console.log(apiUrl);
		// Fetch the JSON data from the API
		fetch(apiUrl)
		  .then((response) => {
			if (!response.ok) {
			  throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.json();
		  })
		  .then((jsonData) => {
			// Now you can access the JSON data and assign its keys to variables
			const lat = jsonData.lat;
			const lon = jsonData.lon;
			const timezone = jsonData.timezone;
			const timezoneOffset = jsonData.timezone_offset;
			const currentData = jsonData.current;
			const minutelyData = jsonData.minutely;
			const hourlyData = jsonData.hourly;
			const dailyData = jsonData.daily;
			console.log (currentData);
			// Accessing properties within currentData
			let currentTemperature = Math.round(currentData.temp);
			const currentFeelsLike = currentData.feels_like;
			const dateData = currentData.dt;
			const currentPressure = currentData.pressure;
			const currentHumidity = currentData.humidity;
			const currentWeather = currentData.weather;
			const currentClouds = currentData.clouds;
			const currentUVI = currentData.uvi;
            const currentWindSpeed = currentData.wind_speed;
			// ... (access other properties within currentData)
			
			// Accessing properties within currentWeather
			const currentWeatherDescription = currentWeather[0].description;
			const currentWeatherIcon = currentWeather[0].icon;
            
            dateDetails =  formatDateToArrayWithDay(convertUnixTimestampToDateTime(dateData));

			// You can similarly access properties within minutelyData, hourlyData, and dailyData if needed
			// Assuming you have already fetched the JSON data and assigned the temperature to currentTemperature
			console.log (currentWeather[0].description + "<----this");
				
			
			homeCaptionElement = document.querySelector('.location');
			if (homeCaptionElement) {
				console.log(cityname);
				homeCaptionElement.textContent = cityName;
			}
			// cWeatherIcon = document.querySelector('weather-icon');
			// console.log ("1-->" + temperatureElement.textContent);
			
			// Find the <h1> element by its class name
			temperatureElement = document.querySelector('.home-header');
			// Replace the content of the <h1> element with the currentTemperature value
			if (temperatureElement) {
			console.log ("before temperature element is changed");
			  temperatureElement.textContent = `${currentTemperature}`;
			  console.log ("2-->" + temperatureElement.textContent);
			}
            
            // change the day
            dayOfWeek = document.querySelector('.day');
			// Replace the content of the <h1> element with the currentTemperature value
			if (dayOfWeek) {
			console.log ("to show which day it is");
			  dayOfWeek.textContent = `${dateDetails[3]}`;
			  console.log ("2-->" + temperatureElement.textContent);
			} 
            
            // change the dateofMonth
            dateofMonth = document.querySelector('.date');
			// Replace the content of the <h1> element with the currentTemperature value
			if (dateofMonth) {
			console.log ("to show which day it is");
			  dateofMonth.textContent = `${dateDetails[2]} ${dateDetails[1]}`;
			  console.log ("2-->" + temperatureElement.textContent);
			}
			
			// Find the <h1> element by its class name
			cWeatherDesc = document.querySelector('.description');
			// Replace the content of the <h1> element with the currentTemperature value
			if (cWeatherDesc) {
			console.log ("before temperature element is changed");
			  cWeatherDesc.textContent = `${currentWeatherDescription}`;
			  console.log ("2-->" + currentWeatherDescription);
			}
            
            // Find the <h1> element by its class name
			windSpeed = document.querySelector('.windSpeed');
			// Replace the content of the <h1> element with the currentTemperature value
			if (windSpeed) {
			//console.log ("before temperature element is changed");
			  windSpeed.textContent = `${currentWindSpeed}`;
			  //console.log ("2-->" + currentWeatherDescription);
			}
			
			// Find the <h1> element by its class name
			cWeatherIcon = document.getElementById('weather-icon');
			// Replace the content of the <h1> element with the currentTemperature value
			if (cWeatherIcon) {
			console.log ("before icon element is changed");
			  cWeatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${currentWeatherIcon}@2x.png`);
			  console.log ("3-->" + currentWeatherIcon);
			}
			
			// Find the <h1> element by its class name
			cHumidity = document.querySelector('#humidity > span');
			// Replace the content of the <h1> element with the currentTemperature value
			if (cHumidity) {
			console.log ("before icon element is changed");
			  cHumidity.textContent = `${currentHumidity}`;
			  console.log ("3-->" + currentHumidity);
			}
			
			// Find the <h1> element by its class name
			cPressure = document.querySelector('#pressure > span');
			// Replace the content of the <h1> element with the currentTemperature value
			if (cHumidity) {
			console.log ("before icon element is changed");
			  cPressure.textContent = `${currentPressure}`;
			  console.log ("3-->" + currentPressure);
			}
			
			// Find the <h1> element by its class name
			cClouds = document.querySelector('#cloud > span');
			// Replace the content of the <h1> element with the currentTemperature value
			if (cClouds) {
			console.log ("before icon element is changed");
			  cClouds.textContent = `${currentClouds}`;
			  console.log ("3-->" + currentClouds);
			}
			
			// Find the <h1> element by its class name
			cUVI = document.querySelector('#uvi > span');
			// Replace the content of the <h1> element with the currentTemperature value
			if (cUVI) {
			console.log ("before icon element is changed");
			  cUVI.textContent = `${currentUVI}`;
			  console.log ("3-->" + currentUVI);
			}
            
            //populate forecast values for the next six days
            const futureDates = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
            let count = 0;
            //console.log(dailyData)
            for (var x in dailyData) {
            
            if (x==0){
                //count = count + 1;
                continue;
            }
            //console.log(x++);
                if (count == 7){
                    break;
                }
            
            populateforcast(dailyData[x], futureDates[count]);
            count = count + 1;
            
            
        }
		  })
		  .catch((error) => {
			console.error(`Error: ${error.message}`);
		  });
    
        
}

