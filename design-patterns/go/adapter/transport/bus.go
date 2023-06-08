// bus.go

package main

type Bus struct {
}

func NewBus() (bus *Bus) {
	bus = &Bus{}
	return
}

func (bus *Bus) GetNumberOfWheels() int {
	return 4
}

func (bus *Bus) GetWeight() float64 {
	return 10_000
}

func (bus *Bus) GetDistanceTravelled() float64 {
	return 1_000
}

func (bus *Bus) GetTravelCostPerMile() float64 {
	return 5
}
