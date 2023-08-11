// car.go

package main

import "fmt"

type Car struct {
	*Transport
}

func NewCar() (car *Car) {
	car = &Car{}
	car.Transport = NewTransport(car)
	return
}

func (car *Car) AddEngine() {
	fmt.Println("Adding Engine to Car")
}

func (car *Car) AddWheel() {
	fmt.Println("Adding 4 Wheels to Car")
}

func (car *Car) AddWing() {
	// implementation not require for car
}

func (car *Car) CreateBody() {
	fmt.Println("Creating Car Body")
}
