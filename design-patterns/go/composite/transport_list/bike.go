// bike.go

package main

import "fmt"

type Bike struct {
}

func NewBike() (bike *Bike) {
	bike = &Bike{}
	return
}

func (bike *Bike) Start() {
	fmt.Println("Starting Bike...")
}

func (bike *Bike) Stop() {
	fmt.Println("Stopping Bike...")
}

func (bike *Bike) Operate() {
	fmt.Println("Riding Bike")
}