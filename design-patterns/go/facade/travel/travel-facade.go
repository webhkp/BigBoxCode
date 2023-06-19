// travel-facade.go

package main

import "fmt"

type TravelFacade struct {
	startLat float64
	startLng float64
	endLat   float64
	endLng   float64
	location *Location
	toll     *Toll
	car      *Car
	weather  *Weather
}

func NewTravelFacade(startLat float64, startLng float64, endLat float64, endLng float64) (travelFacade *TravelFacade) {
	travelFacade = &TravelFacade{}
	travelFacade.startLat = startLat
	travelFacade.startLng = startLng
	travelFacade.endLat = endLat
	travelFacade.endLng = endLng
	travelFacade.location = NewLocation(startLat, startLng, endLat, endLng)
	travelFacade.car = NewCar()
	travelFacade.toll = NewToll()
	travelFacade.weather = NewWeather()
	return
}

func (travelFacade *TravelFacade) GetCurrentLocation() *Point {
	return travelFacade.location.GetCurrentLocation()
}

func (travelFacade *TravelFacade) GetLocationInfo(lat float64, lng float64) {
	travelFacade.location.GetLocationDetails(lat, lng)
	travelFacade.weather.GetWeatherInfo(lat, lng)
}

func (travelFacade *TravelFacade) GetRoute() []Point {
	return travelFacade.location.GetFullRoute()
}

func (travelFacade *TravelFacade) GetTotalTollAmount(lat float64, lng float64) {
	fmt.Printf("Total Toll Amount: %v\n", travelFacade.toll.GetTotalToll(lat, lng))
}

func (travelFacade *TravelFacade) OperateCar() {
	fullRoute := travelFacade.location.GetFullRoute()
	travelFacade.car.StartEngine()

	for i := 1; i <= len(fullRoute); i++ {
		nextMove := travelFacade.location.GetNextMove()
		switch nextMove {
		case "straight":
			travelFacade.car.GoStraight()
		case "left":
			travelFacade.car.GoLeft()
		case "right":
			travelFacade.car.GoRight()
		default:
			travelFacade.car.GoBack()
		}
	}
	travelFacade.car.StopEngine()
}
