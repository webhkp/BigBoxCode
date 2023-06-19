// toll.go

package main

import "math/rand"

type Toll struct {
}

func NewToll() (toll *Toll) {
	toll = &Toll{}
	return
}

func (toll *Toll) GetTollAmount(tollPointId int) (float64) {
	r := rand.Intn(100)
	return float64((r + 10) / 10.0)
}

func (toll *Toll) GetTollPoints(lat float64, lng float64) ([]Point) {
	points := make([]Point, 100)
	for i := 0; i < 3; i++ {
		currentLat := float64((rand.Intn((int)((90-(-90))*10+1))-90*10) / 10.0)
        currentLng := float64((rand.Intn((int)((180-(-180))*10+1))-180*10) / 10.0)

		tempPoint := NewPoint(currentLat, currentLng)
		points[i] = *tempPoint
	}
	return points
}

func (toll *Toll) GetTotalToll(lat float64, lng float64) (float64) {
	return float64((rand.Intn(((100-1)*10 + 1)) + 10) / 10.0)
}
