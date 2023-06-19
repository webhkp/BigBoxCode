// weather.go

package main

import "fmt"

type Weather struct {
}

func NewWeather() (weather *Weather) {
	weather = &Weather{}
	return
}

func (weather *Weather) GetWeatherInfo(lat float64, lng float64) {
	fmt.Println("Temperature: 20.7")
	fmt.Println("Precipitation: 1%")
	fmt.Println("Humidity: 73%")
	fmt.Println("Wind: 8 km/h")
}
