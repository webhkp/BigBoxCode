// transport_factory.go

package main

type TransportFactoryInterface interface {
	GetTransport(name string) (Transport, error)
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
	transport, err := transportFactory.GetTransport(name)

	if err == nil {
		transport.Start()
		transport.Stop()
	}
}

func (transportFactory *TransportFactory) RepairTransport(name string) {
	transport, err := transportFactory.GetTransport(name)

	if err == nil {
		transport.Repair()
	}
}
