// location.go

package main

import (
	"fmt"
	"math/rand"
)

type Location struct {
	startLat float64
	startLng float64
	endLat   float64
	endLng   float64
}

func NewLocation(startLat float64, startLng float64, endLat float64, endLng float64) (location *Location) {
	location = &Location{}
	location.startLat = startLat
	location.startLng = startLng
	location.endLat = endLat
	location.endLng = endLng
	return
}

func (location *Location) GetCurrentLocation() (*Point) {
	currentLat := float64((rand.Intn((90 - -90)*10 + 1) - 90*10) / 10.0)
	currentLng := float64((rand.Intn((180 - -180)*10 + 1) - 180*10) / 10.0)
	return NewPoint(currentLat, currentLng)
}

func (location *Location) GetFullRoute() ([]Point) {
	points := make([]Point, 10)
	for i := 0; i < 10; i++ {
		currentLat := float64((rand.Intn((int)((90-(-90))*10+1))-90*10) / 10.0)
        currentLng := float64((rand.Intn((int)((180-(-180))*10+1))-180*10) / 10.0)

		tempPoint := NewPoint(currentLat, currentLng)
		points[i] = *tempPoint
	}
	return points
}

func (location *Location) GetLocationDetails(lat float64, lng float64) {
	fmt.Println("Country: ABC")
	fmt.Println("City: DEF")
	fmt.Println("State: GHI")
	fmt.Println("Zip: 101010")
}

func (location *Location) GetNextMove() (string) {
	nextMoves := []string{"straight", "left", "right"}
	var moveIndex int = rand.Intn(len(nextMoves));
	return nextMoves[moveIndex]
}
