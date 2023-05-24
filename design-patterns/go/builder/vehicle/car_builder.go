// car_builder.go

package main

import "fmt"

type CarBuilder struct {
	wheel    int
	engine   int
	seat     int
	interior bool
	door     int
}

func NewCarBuilder() (carBuilder *CarBuilder) {
	carBuilder = &CarBuilder{}
	return
}

func (carBuilder *CarBuilder) AddDoor(noOfDoor int) {
	fmt.Printf("Add %d door\n", noOfDoor)
	carBuilder.door += noOfDoor
}

func (carBuilder *CarBuilder) AddEngine(noOfEngine int) {
	fmt.Printf("Add %d engine\n", noOfEngine)
	carBuilder.engine += noOfEngine
}

func (carBuilder *CarBuilder) AddInterior() {
	fmt.Println("Add interior")
	carBuilder.interior = true
}

func (carBuilder *CarBuilder) AddSeat(noOfSeat int) {
	fmt.Printf("Add %d seat\n", noOfSeat)
	carBuilder.seat = noOfSeat
}

func (carBuilder *CarBuilder) AddWheel(noOfWheel int) {
	fmt.Printf("Add %v wheel\n", noOfWheel)
	carBuilder.wheel += noOfWheel
}

func (carBuilder *CarBuilder) AddWing(noOfWings int) {
	panic("Can not add wings")
}

func (carBuilder *CarBuilder) Build() *Car {
	car := NewCar(carBuilder.wheel, carBuilder.engine, carBuilder.seat, carBuilder.door, carBuilder.interior)
	return car
}
