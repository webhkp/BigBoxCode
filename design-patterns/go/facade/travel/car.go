// car.go

package main

import (
	"fmt"
	"math/rand"
)

type Car struct {
}

func NewCar() (car *Car) {
	car = &Car{}
	return
}

func (car *Car) GetDistanceTravelled() (float64) {
	return float64((rand.Intn((10000-100)*10 + 1) + 100*10) / 10.0)
}

func (car *Car) GoLeft() {
	fmt.Println("Go Left: ←")
}

func (car *Car) GoRight() {
	fmt.Println("Go Right: →")
}

func (car *Car) GoStraight() {
	fmt.Println("Go Straight: ↑")
}

func (car *Car) GoBack() {
	fmt.Println("Go Back: ↓")
}

func (car *Car) StartEngine() {
	fmt.Println("Start Engine")
}

func (car *Car) StopEngine() {
	fmt.Println("Stop Engine")
}
