// bike.go

package main

type Bike struct {
}

func NewBike() (bike *Bike) {
	bike = &Bike{}
	return
}

func (bike *Bike) GetNumberOfWheels() int {
	return 2
}

func (bike *Bike) GetWeight() float64 {
	return 700
}

func (bike *Bike) GetDistanceTravelled() float64 {
	return 80
}

func (bike *Bike) GetTravelCostPerMile() float64 {
	return 4
}
