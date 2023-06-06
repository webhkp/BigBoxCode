// plane.go

package main

import "fmt"

type Plane struct {
	Model string
	Color string
}

func NewPlane() (plane *Plane) {
	plane = &Plane{}
	return
}

func (plane *Plane) Clone() Prototype {
	planeClone := NewPlane()
	planeClone.Model = plane.Model
	planeClone.Color = plane.Color

	return planeClone
}

func (plane *Plane) ToString() string {
	return fmt.Sprintf("Model: %v | Color: %v", plane.Model, plane.Color)
}
