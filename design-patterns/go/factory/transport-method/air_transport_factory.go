// air_transport_factory.go

package main

import (
	"errors"
	"strings"
)

type AirTransportFactory struct {
	TransportFactory
}

func NewAirTransportFactory() (airTransportFactory *AirTransportFactory) {
	airTransportFactory = &AirTransportFactory{}
	airTransportFactory.TransportFactory.TransportFactoryInterface = airTransportFactory
	return
}

func (airTransportFactory *AirTransportFactory) GetTransport(name string) (Transport, error) {
	if strings.ToLower(name) == "plane" {
		return NewPlane(), nil
	}

	if strings.ToLower(name) == "helicopter" {
		return NewHelicopter(), nil
	}

	return nil, errors.New("unknown identifier for AirTransportFactory")
}