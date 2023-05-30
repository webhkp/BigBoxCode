// car.go

package main

import "fmt"

type Car struct {
}

func NewCar() (car *Car) {
	car = &Car{}
	return
}

func (car *Car) Start() {
	fmt.Println("Car Started")
}

func (car *Car) Stop() {
	fmt.Println("Car Stopped")
}

func (car *Car) Repair() {
	fmt.Println("Car Repair")
}
