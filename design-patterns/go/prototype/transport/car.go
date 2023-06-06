// car.go

package main

import "fmt"

type Car struct {
	Make  int
	Model string
	Color string
}

func NewCar() (car *Car) {
	car = &Car{}
	return
}

func (car *Car) Clone() Prototype {
	carClone := NewCar()
	carClone.Make = car.Make
	carClone.Model = car.Model
	carClone.Color = car.Color

	return carClone
}

func (car *Car) ToString() string {
	return fmt.Sprintf("Make: %v  | Model: %v | Color: %v", car.Make, car.Model, car.Color)
}
