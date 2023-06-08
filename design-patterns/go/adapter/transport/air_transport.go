// air_transport.go

package main

type AirTransport interface {
	GetNumberOfEngines() int

	GetNumberOfWheels() int

	GetWeight() float64

	// In Nautical miles
	GetDistanceTravelled() float64
	
	GetTravelCostTotal() float64
}