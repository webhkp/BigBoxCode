// main.go

package main

import "fmt"

func main() {
	travelFacade := NewTravelFacade(10, 10, 20, 30)
	currentLocation := travelFacade.GetCurrentLocation()
	fmt.Printf("Current Latitude: %v\n", currentLocation.x)
	fmt.Printf("Current Longitude: %v\n", currentLocation.y)

	travelFacade.GetLocationInfo(20, 30)
	travelFacade.GetTotalTollAmount(20, 30)

	travelFacade.OperateCar()
}
