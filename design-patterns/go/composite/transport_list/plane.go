// plane.go

package main

import "fmt"

type Plane struct {
}

func NewPlane() (plane *Plane) {
	plane = &Plane{}
	return
}

func (plane *Plane) Start() {
	fmt.Println("Starting Plane...")
}

func (plane *Plane) Stop() {
	fmt.Println("Stopping Plane...")
}

func (plane *Plane) Operate() {
	fmt.Println("Flying Plane")
}
