// main.go

package main

import "fmt"

func main() {
	vehicleProducer := VehicleProducer{}

	fmt.Println("Building Car:")
	carBuilder := NewCarBuilder()
	vehicleProducer.BuildCar(carBuilder)
	car := carBuilder.Build()

	fmt.Printf("Final Result:\n%+v\n", *car)

	fmt.Println("Building Plane:")
	planeBuilder := NewPlaneBuilder()
	vehicleProducer.BuildPlane(planeBuilder)
	plane := planeBuilder.Build()

	fmt.Printf("Final Result:\n%+v", *plane)
}
