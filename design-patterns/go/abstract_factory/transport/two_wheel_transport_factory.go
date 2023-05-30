// two_wheel_transport_factory.go

package main

import (
	"errors"
	"strings"
)

type TwoWheelTransportFactory struct {
}

func NewTwoWheelTransportFactory() (twoWheelTransportFactory *TwoWheelTransportFactory) {
	twoWheelTransportFactory = &TwoWheelTransportFactory{}
	return
}

func (twoWheelTransportFactory *TwoWheelTransportFactory) GetTransport(identifier string) (Transport, error) {
	identifier = strings.ToLower(identifier)
	
	switch identifier {
		case "bicycle": return NewBicycle(), nil
		case "motorcycle": return NewMotorcycle(), nil
		default: return nil, errors.New("identifier does not match with any defined two wheel transport")
	}
}