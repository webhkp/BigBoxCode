// bike.go

package main

import "fmt"

type Bike struct {
}

func NewBike() (bike *Bike) {
	bike = &Bike{}
	return
}

func (bike *Bike) Repair() {
	fmt.Println("Bike Repair")
}

func (bike *Bike) Start() {
	fmt.Println("Bike started")
}

func (bike *Bike) Stop() {
	fmt.Println("Bike Stopped")
}
