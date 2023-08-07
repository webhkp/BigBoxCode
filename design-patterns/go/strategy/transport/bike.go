// bike.go

package main

import "fmt"

type Bike struct {
}

func NewBike() (bike *Bike) {
	bike = &Bike{}
	return
}

func (bike *Bike) GetInfo() {
	fmt.Println("Transport type: Bike")
	fmt.Println("Number of wheels: 2")
	fmt.Println("Average Weight: 700 Pounds")
}

func (bike *Bike) Operate() {
	fmt.Println("Riding Bike ............")
}

func (bike *Bike) Repair() {
	fmt.Println("Bike repair")
}

func (bike *Bike) Start() {
	fmt.Println("Bike started")
}

func (bike *Bike) Stop() {
	fmt.Println("Bike stopped")
}
