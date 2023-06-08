// plane.go

package main

type Plane struct {
}

func NewPlane() (plane *Plane) {
	plane = &Plane{}
	return
}

func (plane *Plane) GetNumberOfEngines() int {
	return 2
}

func (plane *Plane) GetNumberOfWheels() int {
	return 3
}

func (plane *Plane) GetWeight() float64 {
	return 127_000
}

func (plane *Plane) GetDistanceTravelled() float64 {
	return 500 // Nautical miles
}

func (plane *Plane) GetTravelCostTotal() float64 {
	return 3_000
}
