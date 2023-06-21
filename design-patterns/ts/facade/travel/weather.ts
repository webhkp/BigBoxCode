// weather.ts

class Weather {
    getWeatherInfo(lat: number, lng: number): void {
        console.log("Temperature: 20.7");
        console.log("Precipitation: 1%");
        console.log("Humidity: 73%");
        console.log("Wind: 8 km/h");
    }
}

export default Weather;