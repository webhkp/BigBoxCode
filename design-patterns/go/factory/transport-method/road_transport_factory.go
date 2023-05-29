// road_transport_factory.go

package main

import (
	"errors"
	"strings"
)

type RoadTransportFactory struct {
	TransportFactory
}

func NewRoadTransportFactory() (roadTransportFactory *RoadTransportFactory) {
	roadTransportFactory = &RoadTransportFactory{TransportFactory{}}
	roadTransportFactory.TransportFactory.TransportFactoryInterface = roadTransportFactory
	return
}

func (roadTransportFactory *RoadTransportFactory) GetTransport(name string) (Transport, error) {
	if strings.ToLower(name) == "car" {
		return NewCar(), nil
	}

	if strings.ToLower(name) == "bike" {
		return NewBike(), nil
	}

	if strings.ToLower(name) == "bus" {
		return NewBus(), nil
	}

	return nil, errors.New("unknown identifier for RoadTransportFactory")
}
