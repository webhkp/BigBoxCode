// plane.go

package main

import "fmt"

type Plane struct {
	wheel    int
	engine   int
	seat     int
	door     int
	wing     int
	interior bool
}

func NewPlane(noOfWheel int, noOfEngine int, noOfSeat int, noOfDoor int, wing int, interior bool) (plane *Plane) {
	plane = &Plane{}
	plane.wheel = noOfWheel
	plane.engine = noOfEngine
	plane.seat = noOfSeat
	plane.door = noOfDoor
	plane.wing = wing
	plane.interior = interior
	return
}

func (plane *Plane) GetDoor() int {
	return plane.door
}

func (plane *Plane) GetEngine() int {
	return plane.engine
}

func (plane *Plane) GetSeat() int {
	return plane.seat
}

func (plane *Plane) GetWheel() int {
	return plane.wheel
}

func (plane *Plane) GetWing() int {
	return plane.wing
}

func (plane *Plane) IsInterior() bool {
	return plane.interior
}

func (plane *Plane) ToString() string {
	return fmt.Sprintf("%v%v%v%v%v%v%v%v%v%v%v%v", "Plane: Wheel -> ", plane.wheel, " | Engine -> ", plane.engine, " | Seat -> ", plane.seat, " | Door -> ", plane.door, " | Wing: ", plane.wing, " | Interior -> ", plane.interior)
}
