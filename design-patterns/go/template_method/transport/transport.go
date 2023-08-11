// transport.go

package main

import "fmt"

type ITransport interface {
	CreateBody()
	AddEngine()
	AddWheel()

	// Required only for Plane
	AddWing()
}

type Transport struct {
	ITransport
}

func NewTransport(iTransport ITransport) (transport *Transport) {
	transport = &Transport{}
	transport.ITransport = iTransport
	return
}

func (transport *Transport) AddSeat() {
	// Add seats to the vehicle

	// Adding seats are same for all transports so same functions for all
	fmt.Println("Adding seats")
}

func (transport *Transport) paint() {
	fmt.Println("Painting")
}

func (transport *Transport) Build() {
	transport.ITransport.CreateBody()
	transport.ITransport.AddEngine()
	transport.ITransport.AddWheel()
	transport.ITransport.AddWing()

	transport.AddSeat()
	transport.paint()
}
