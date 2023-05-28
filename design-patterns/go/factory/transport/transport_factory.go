// transport_factory.go

package main

import "strings"

type TransportFactory struct {
}

func NewTransportFactory() (transportFactory *TransportFactory) {
	transportFactory = &TransportFactory{}
	return
}

func (transportFactory *TransportFactory) GetTransport(identifier string) Transport {
	if strings.ToLower(identifier) == "bike" {
		return NewBike()
	}

	if strings.ToLower(identifier) == "car" {
		return NewCar()
	}

	if strings.ToLower(identifier) == "plane" {
		return NewPlane()
	}
	return nil
}
