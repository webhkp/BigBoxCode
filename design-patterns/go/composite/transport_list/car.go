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
	fmt.Println("Starting Car...")
}

func (car *Car) Stop() {
	fmt.Println("Stopping Car...")
}

func (car *Car) Operate() {
	fmt.Println("Driving Car")
}
