// transport_factory.go

package main

type TransportFactoryInterface interface {
	GetTransport(name string) Transport
	OperateTransport(name string)
	RepairTransport(name string)
}

type TransportFactory struct {
	TransportFactoryInterface
}

func NewTransportFactory() (transportFactory *TransportFactory) {
	transportFactory = &TransportFactory{}
	return
}

func (transportFactory *TransportFactory) OperateTransport(name string) {
	transport := transportFactory.GetTransport(name)
	transport.Start()
	transport.Stop()
}

func (transportFactory *TransportFactory) RepairTransport(name string) {
	transport := transportFactory.GetTransport(name)
	transport.Repair()
}
