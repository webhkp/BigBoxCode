// four_wheel_transport_factory.go

package main

import (
	"errors"
	"strings"
)

type FourWheelTransportFactory struct {
}

func NewFourWheelTransportFactory() (fourWheelTransportFactory *FourWheelTransportFactory) {
	fourWheelTransportFactory = &FourWheelTransportFactory{}
	return
}

func (fourWheelTransportFactory *FourWheelTransportFactory) GetTransport(identifier string) (Transport, error) {
	identifier = strings.ToLower(identifier)

	switch identifier {
	case "car":
		return NewCar(), nil
	case "truck":
		return NewTruck(), nil
	default:
		return nil, errors.New("identifier does not match with any defined four wheel transport")
	}
}
