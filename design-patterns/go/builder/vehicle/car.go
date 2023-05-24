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

func NewCar(noOfWheel int, noOfEngine int, noOfSeat int, noOfDoor int, interior bool) (car *Car) {
	car = &Car{}
	car.wheel = noOfWheel
	car.engine = noOfEngine
	car.seat = noOfSeat
	car.door = noOfDoor
	car.interior = interior
	return
}

func (car *Car) GetDoor() int {
	return car.door
}

func (car *Car) GetEngine() int {
	return car.engine
}

func (car *Car) GetSeat() int {
	return car.seat
}

func (car *Car) GetWheel() int {
	return car.wheel
}

func (car *Car) IsInterior() bool {
	return car.interior
}

func (car *Car) ToString() string {
	return fmt.Sprintf("%v%v%v%v%v%v%v%v%v%v", "Car: Wheel -> ", car.wheel, " | Engine -> ", car.engine, " | Seat -> ", car.seat, " | Door -> ", car.door, " | Interior -> ", car.interior)
}
