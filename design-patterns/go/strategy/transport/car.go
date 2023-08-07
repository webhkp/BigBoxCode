// car.go

package main

import "fmt"

type Car struct {
}

func NewCar() (car *Car) {
	car = &Car{}
	return
}

func (car *Car) GetInfo() {
	fmt.Println("Transport type: Car")
	fmt.Println("Number of wheels: 4")
	fmt.Println("Average Weight: 4,000 Pounds")
}

func (car *Car) Operate() {
	fmt.Println("Driving car ............")
}

func (car *Car) Repair() {
	fmt.Println("Car repair")
}

func (car *Car) Start() {
	fmt.Println("Car started")
}

func (car *Car) Stop() {
	fmt.Println("Car stopped")
}
