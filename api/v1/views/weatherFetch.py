#!/usr/bin/python3

import requests

class WeatherData:
    def __init__(self, url):
        # Initialize attributes with data fetched from the provided URL
        self.url = url
        self.refresh()
		
    def refresh(self):
        # Fetch fresh JSON data from the original URL
        json_data = self.fetch_json(self.url)

        if json_data:
            self.lat = json_data.get("lat")
            self.lon = json_data.get("lon")
            self.timezone = json_data.get("timezone")
            self.timezone_offset = json_data.get("timezone_offset")

            current_data = json_data.get("current", {})
            self.current_dt = current_data.get("dt")
            self.sunrise = current_data.get("sunrise")
            self.sunset = current_data.get("sunset")
            self.temp = abs(current_data.get("temp"))
            self.feels_like = current_data.get("feels_like")
            self.pressure = current_data.get("pressure")
            self.humidity = current_data.get("humidity")
            self.dew_point = current_data.get("dew_point")
            self.uvi = current_data.get("uvi")
            self.clouds = current_data.get("clouds")
            self.visibility = current_data.get("visibility")
            self.wind_speed = current_data.get("wind_speed")
            self.wind_deg = current_data.get("wind_deg")
            self.wind_gust = current_data.get("wind_gust")

            weather_info = current_data.get("weather", [])
            if weather_info:
                self.weather_id = weather_info[0].get("id")
                self.weather_main = weather_info[0].get("main")
                self.weather_description = weather_info[0].get("description")
                self.weather_icon = weather_info[0].get("icon")
        else:
            # Handle the case where JSON data couldn't be fetched
            print(f"Error: Couldn't refresh data from {self.url}")
            # Set default values or raise an exception, depending on your requirements


    def fetch_json(self, url):
        try:
            response = requests.get(url)
            response.raise_for_status()  # Check for HTTP errors

            json_data = response.json()
            return json_data
        except requests.exceptions.RequestException as e:
            print(f"Error fetching JSON from {url}: {e}")
            return None

    # Getter methods for each attribute
    def get_lat(self):
        return self.lat

    def get_lon(self):
        return self.lon

    def get_timezone(self):
        return self.timezone

    def get_timezone_offset(self):
        return self.timezone_offset

    def get_current_dt(self):
        return self.current_dt

    def get_sunrise(self):
        return self.sunrise

    def get_sunset(self):
        return self.sunset

    def get_temp(self):
        return self.temp

    def get_feels_like(self):
        return self.feels_like

    def get_pressure(self):
        return self.pressure

    def get_humidity(self):
        return self.humidity

    def get_dew_point(self):
        return self.dew_point

    def get_uvi(self):
        return self.uvi

    def get_clouds(self):
        return self.clouds

    def get_visibility(self):
        return self.visibility

    def get_wind_speed(self):
        return self.wind_speed

    def get_wind_deg(self):
        return self.wind_deg

    def get_wind_gust(self):
        return self.wind_gust

    def get_weather_id(self):
        return self.weather_id

    def get_weather_main(self):
        return self.weather_main

    def get_weather_description(self):
        return self.weather_description

    def get_weather_icon(self):
        return self.weather_icon

# # Example usage:
# json_data = {
    # "lat": 5.6037,
    # "lon": -0.187,
    # "timezone": "Africa/Accra",
    # "timezone_offset": 0,
    # "current": {
        # "dt": 1703704530,
        # "sunrise": 1703657254,
        # "sunset": 1703699725,
        # "temp": 29.26,
        # "feels_like": 31.16,
        # "pressure": 1012,
        # "humidity": 58,
        # "dew_point": 20.15,
        # "uvi": 0,
        # "clouds": 5,
        # "visibility": 10000,
        # "wind_speed": 4.09,
        # "wind_deg": 147,
        # "wind_gust": 6,
        # "weather": [{"id": 800, "main": "Clear", "description": "clear sky", "icon": "01n"}]
    # }
# }

# weather_instance = WeatherData(json_data)

# # Example of using getter methods
# print("Latitude:", weather_instance.get_lat())
# print("Longitude:", weather_instance.get_lon())
# print("Temperature:", weather_instance.get_temp())
# # ... and so on
