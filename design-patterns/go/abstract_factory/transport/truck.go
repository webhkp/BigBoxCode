// truck.go

package main

import "fmt"

type Truck struct {
}

func NewTruck() (truck *Truck) {
	truck = &Truck{}
	return
}

func (truck *Truck) Start() {
	fmt.Println("Truck Started")
}

func (truck *Truck) Stop() {
	fmt.Println("Truck Stopped")
}

func (truck *Truck) Repair() {
	fmt.Println("Truck Repair")
}