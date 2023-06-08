// air_transport_adapter.go

package main

type AirTransportAdapter struct {
	airTransport AirTransport
}

func NewAirTransportAdapter(airTransport AirTransport) (airTransportAdapter *AirTransportAdapter) {
	airTransportAdapter = &AirTransportAdapter{}
	airTransportAdapter.airTransport = airTransport
	return
}

func (airTransportAdapter *AirTransportAdapter) GetNumberOfWheels() int {
	return airTransportAdapter.airTransport.GetNumberOfWheels()
}

func (airTransportAdapter *AirTransportAdapter) GetWeight() float64 {
	return airTransportAdapter.airTransport.GetWeight()
}

func (airTransportAdapter *AirTransportAdapter) GetDistanceTravelled() float64 {
	// Convert nautical mile to mile and return
	distanceInNauticalMile := airTransportAdapter.airTransport.GetDistanceTravelled()
	return distanceInNauticalMile * 1.151
}

func (airTransportAdapter *AirTransportAdapter) GetTravelCostPerMile() float64 {
	// calculate cost per mile from total cost
	totalCost := airTransportAdapter.airTransport.GetTravelCostTotal()
	return totalCost / airTransportAdapter.GetDistanceTravelled()
}