// air_transport_factory.go

package main

import "strings"

type AirTransportFactory struct {
	TransportFactory
}

func NewAirTransportFactory() (airTransportFactory *AirTransportFactory) {
	airTransportFactory = &AirTransportFactory{}
	airTransportFactory.TransportFactory.TransportFactoryInterface = airTransportFactory
	return
}

func (airTransportFactory *AirTransportFactory) GetTransport(name string) Transport {
	if strings.ToLower(name) == "plane" {
		return NewPlane()
	}

	if strings.ToLower(name) == "helicopter" {
		return NewHelicopter()
	}

	return nil
}