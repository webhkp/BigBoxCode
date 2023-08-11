// bike.go

package main

import "fmt"

type Bike struct {
	*Transport
}

func NewBike() (bike *Bike) {
	bike = &Bike{}
	bike.Transport = NewTransport(bike)
	return
}

func (bike *Bike) AddEngine() {
	fmt.Println("Adding Engine to Bike")
}

func (bike *Bike) AddWheel() {
	fmt.Println("Adding 2 Wheels to Bike")
}

func (bike *Bike) AddWing() {
	// Implementation not required for bike
}

func (bike *Bike) CreateBody() {
	fmt.Println("Creating Bike Body")
}
