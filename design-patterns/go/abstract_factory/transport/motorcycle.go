// motorcycle.go

package main

import "fmt"

type Motorcycle struct {
}

func NewMotorcycle() (motorcycle *Motorcycle) {
	motorcycle = &Motorcycle{}
	return
}

func (motorcycle *Motorcycle) Start() {
	fmt.Println("Motorcycle Started")
}

func (motorcycle *Motorcycle) Stop() {
	fmt.Println("Motorcycle Stopped")
}

func (motorcycle *Motorcycle) Repair() {
	fmt.Println("Motorcycle Repair")
}