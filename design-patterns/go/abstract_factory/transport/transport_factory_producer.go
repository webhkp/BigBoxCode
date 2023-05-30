// transport_factory_producer.go

package main

import "errors"

type TransportFactoryProducer struct {
}

func NewTransportFactoryProducer() (transportFactoryProducer *TransportFactoryProducer) {
	transportFactoryProducer = &TransportFactoryProducer{}
	return
}

func (transportFactoryProducer *TransportFactoryProducer) GetFactory(numberOfWheels int) (TransportFactory, error) {
	switch numberOfWheels {
	case 2:
		return NewTwoWheelTransportFactory(), nil
	case 4:
		return NewFourWheelTransportFactory(), nil
	default:
		return nil, errors.New("number of wheels does not match with any predefined tyep")
	}
}
