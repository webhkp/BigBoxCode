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

func NewPlane(noOfWheel int, noOfEngine int, noOfSeat int, noOfDoor int, wing int, interior bool) (rcvr *Plane) {
	rcvr = &Plane{}
	rcvr.wheel = noOfWheel
	rcvr.engine = noOfEngine
	rcvr.seat = noOfSeat
	rcvr.door = noOfDoor
	rcvr.wing = wing
	rcvr.interior = interior
	return
}

func (rcvr *Plane) GetDoor() int {
	return rcvr.door
}

func (rcvr *Plane) GetEngine() int {
	return rcvr.engine
}

func (rcvr *Plane) GetSeat() int {
	return rcvr.seat
}

func (rcvr *Plane) GetWheel() int {
	return rcvr.wheel
}

func (rcvr *Plane) GetWing() int {
	return rcvr.wing
}

func (rcvr *Plane) IsInterior() bool {
	return rcvr.interior
}

func (rcvr *Plane) ToString() string {
	return fmt.Sprintf("%v%v%v%v%v%v%v%v%v%v%v%v", "Plane: Wheel -> ", rcvr.wheel, " | Engine -> ", rcvr.engine, " | Seat -> ", rcvr.seat, " | Door -> ", rcvr.door, " | Wing: ", rcvr.wing, " | Interior -> ", rcvr.interior)
}
