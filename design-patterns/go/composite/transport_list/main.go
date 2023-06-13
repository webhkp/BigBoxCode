// main.go

package main

import "fmt"

func main() {
	bike := NewBike()
	plane := NewPlane()
	car := NewCar()
	secondCar := NewCar()
	transports := NewTransportGroup()
	transports.AddTransport(bike)
	transports.AddTransport(plane)
	transports.AddTransport(car)
	transports.AddTransport(secondCar)

	fmt.Println("-----------------Output with 4 transports------------------")

	transports.Start()
	transports.Operate()
	transports.Stop()

	fmt.Println("\n-----------------Output when plane is removed------------------")

	transports.RemoveTransport(plane)
	transports.Start()
	transports.Operate()
	transports.Stop()
}
