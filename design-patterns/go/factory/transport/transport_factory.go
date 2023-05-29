// transport_factory.go

package main

import (
	"errors"
	"strings"
)

type TransportFactory struct {
}

func NewTransportFactory() (transportFactory *TransportFactory) {
	transportFactory = &TransportFactory{}
	return
}

func (transportFactory *TransportFactory) GetTransport(identifier string) (Transport, error) {
	if strings.ToLower(identifier) == "bike" {
		return NewBike(), nil
	}

	if strings.ToLower(identifier) == "car" {
		return NewCar(), nil
	}

	if strings.ToLower(identifier) == "plane" {
		return NewPlane(), nil
	}

	return nil, errors.New("unknown transport identifier")
}
