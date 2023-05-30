// transport_factory.go

package main

type TransportFactory interface {
	GetTransport(identifier string) (Transport, error)
}