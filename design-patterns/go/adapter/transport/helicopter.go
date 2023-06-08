// helicopter.go

package main

type Helicopter struct {
}

func NewHelicopter() (helicopter *Helicopter) {
	helicopter = &Helicopter{}
	return
}


func (helicopter *Helicopter) GetNumberOfEngines() int {
	return 1
}

func (helicopter *Helicopter) GetNumberOfWheels() int {
	return 0
}

func (helicopter *Helicopter) GetWeight() float64 {
	return 12_000
}

func (helicopter *Helicopter) GetDistanceTravelled() float64 {
	return 180
}


func (helicopter *Helicopter) GetTravelCostTotal() float64 {
	return 20_000
}
