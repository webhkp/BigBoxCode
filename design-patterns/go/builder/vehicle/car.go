// car.go

package main

import "fmt"

type Car struct {
	wheel    int
	engine   int
	seat     int
	door     int
	interior bool
}

func NewCar(noOfWheel int, noOfEngine int, noOfSeat int, noOfDoor int, interior bool) (rcvr *Car) {
	rcvr = &Car{}
	rcvr.wheel = noOfWheel
	rcvr.engine = noOfEngine
	rcvr.seat = noOfSeat
	rcvr.door = noOfDoor
	rcvr.interior = interior
	return
}

func (rcvr *Car) GetDoor() int {
	return rcvr.door
}

func (rcvr *Car) GetEngine() int {
	return rcvr.engine
}

func (rcvr *Car) GetSeat() int {
	return rcvr.seat
}

func (rcvr *Car) GetWheel() int {
	return rcvr.wheel
}

func (rcvr *Car) IsInterior() bool {
	return rcvr.interior
}

func (rcvr *Car) ToString() string {
	return fmt.Sprintf("%v%v%v%v%v%v%v%v%v%v", "Car: Wheel -> ", rcvr.wheel, " | Engine -> ", rcvr.engine, " | Seat -> ", rcvr.seat, " | Door -> ", rcvr.door, " | Interior -> ", rcvr.interior)
}
