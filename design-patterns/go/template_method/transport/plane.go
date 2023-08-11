// plane.go

package main

import "fmt"

type Plane struct {
	*Transport
}

func NewPlane() (plane *Plane) {
	plane = &Plane{}
	plane.Transport = NewTransport(plane)
	return
}

func (plane *Plane) AddEngine() {
	fmt.Println("Adding Engine to Plane")
}

func (plane *Plane) AddWheel() {
	fmt.Println("Adding 3 Wheels to Plane")
}

func (plane *Plane) AddWing() {
	fmt.Println("Adding Wings Plane")
}

func (plane *Plane) CreateBody() {
	fmt.Println("Creating Plane Body")
}
