// plane.go

package main

import "fmt"

type Plane struct {
}

func NewPlane() (plane *Plane) {
	plane = &Plane{}
	return
}

func (plane *Plane) Repair() {
	fmt.Println("Plane Repair")
}

func (plane *Plane) Start() {
	fmt.Println("Plane started")
}

func (plane *Plane) Stop() {
	fmt.Println("Plane Stopped")
}