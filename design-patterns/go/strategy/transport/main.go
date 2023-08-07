// main.go

package main

import "fmt"

func main() {
	fmt.Println("Operating Bike:")

	myTransport := NewTransportStrategy(NewBike())
	myTransport.Execute()
	myTransport.Stop()

	fmt.Println("\n\nOperating Car:")

	myTransport = NewTransportStrategy(NewCar())
	myTransport.Execute()
	myTransport.Stop()
	myTransport.Repair()

	fmt.Println("\n\nOperating plane:")

	myTransport = NewTransportStrategy(NewPlane())
	myTransport.Execute()
	myTransport.Stop()
}
