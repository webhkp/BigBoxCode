// main.go

package main

import "fmt"

func main() {
	fmt.Println("Get information of Bus travel...")
	
	bus := NewBus()
	fmt.Printf("\nNumber of wheels: %v", bus.GetNumberOfWheels())
	fmt.Printf("\nWeight(kg): %v", bus.GetWeight())
	fmt.Printf("\nDistance(miles): %v", bus.GetDistanceTravelled())
	fmt.Printf("\nCost per mile: %v", bus.GetTravelCostPerMile())

	fmt.Println("\nGet information of Plane travel...")
	
	planeTransport := NewAirTransportAdapter(NewPlane())
	fmt.Printf("\nNumber of wheels: %v", planeTransport.GetNumberOfWheels())
	fmt.Printf("\nWeight(kg): %v", planeTransport.GetWeight())
	fmt.Printf("\nDistance(miles): %v", planeTransport.GetDistanceTravelled())
	fmt.Printf("\nCost per mile: %v", planeTransport.GetTravelCostPerMile())
}
