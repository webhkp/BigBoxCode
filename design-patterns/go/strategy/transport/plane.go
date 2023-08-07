// plane.go

package main

import "fmt"

type Plane struct {
}

func NewPlane() (plane *Plane) {
	plane = &Plane{}
	return
}

func (plane *Plane) GetInfo() {
	fmt.Println("Transport type: Plane")
	fmt.Println("Number of wheels: 3")
	fmt.Println("Average Weight: 50,000 Pounds")
}

func (plane *Plane) Operate() {
	fmt.Println("Flying plane ............")
}

func (plane *Plane) Repair() {
	fmt.Println("Plane repair")
}

func (plane *Plane) Start() {
	fmt.Println("Plane started")
}

func (plane *Plane) Stop() {
	fmt.Println("Plane stopped")
}
