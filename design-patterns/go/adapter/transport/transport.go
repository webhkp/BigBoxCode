// transport.go

package main

type Transport interface {
	GetNumberOfWheels() int

	GetWeight() float64

	// In miles
	GetDistanceTravelled() float64
	
	GetTravelCostPerMile() float64
}