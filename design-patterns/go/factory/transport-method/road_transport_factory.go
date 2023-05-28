// road_transport_factory.go

package main

import "strings"

type RoadTransportFactory struct {
	TransportFactory
}

func NewRoadTransportFactory() (roadTransportFactory *RoadTransportFactory) {
	roadTransportFactory = &RoadTransportFactory{TransportFactory{}}
	roadTransportFactory.TransportFactory.TransportFactoryInterface = roadTransportFactory
	return
}

func (roadTransportFactory *RoadTransportFactory) GetTransport(name string) Transport {
	if strings.ToLower(name) == "car" {
		return NewCar()
	}

	if strings.ToLower(name) == "bike" {
		return NewBike()
	}

	if strings.ToLower(name) == "bus" {
		return NewBus()
	}

	return nil
}
