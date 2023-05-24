package main

import "fmt"

// plane_builder.go

type PlaneBuilder struct {
	wheel    int
	engine   int
	seat     int
	interior bool
	door     int
	wing     int
}

func NewPlaneBuilder() (planeBuilder *PlaneBuilder) {
	planeBuilder = &PlaneBuilder{}
	return
}

func (planeBuilder *PlaneBuilder) AddDoor(noOfDoor int) {
	fmt.Printf("Add %d door\n", noOfDoor)
	planeBuilder.door += noOfDoor
}

func (planeBuilder *PlaneBuilder) AddEngine(noOfEngine int) {
	fmt.Printf("Add %d engine\n", noOfEngine)
	planeBuilder.engine += noOfEngine
}

func (planeBuilder *PlaneBuilder) AddInterior() {
	fmt.Println("Add interior")
	planeBuilder.interior = true
}

func (planeBuilder *PlaneBuilder) AddSeat(noOfSeat int) {
	fmt.Printf("Add %d Seat\n", noOfSeat)
	planeBuilder.seat = noOfSeat
}

func (planeBuilder *PlaneBuilder) AddWheel(noOfWheel int) {
	fmt.Printf("Add %d wheels\n", noOfWheel)
	planeBuilder.wheel += noOfWheel
}

func (planeBuilder *PlaneBuilder) AddWing(noOfWings int) {
	fmt.Printf("Add %d wing\n", noOfWings)
	planeBuilder.wing += planeBuilder.wing
}

func (planeBuilder *PlaneBuilder) Build() *Plane {
	plane := NewPlane(planeBuilder.wheel, planeBuilder.engine, planeBuilder.seat, planeBuilder.door, planeBuilder.wing, planeBuilder.interior)
	return plane
}
