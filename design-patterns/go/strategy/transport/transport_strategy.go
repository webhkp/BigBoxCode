// transport_strategy.go

package main

type TransportStrategy struct {
	transport Transport
}

func NewTransportStrategy(transport Transport) (rcvr *TransportStrategy) {
	rcvr = &TransportStrategy{}
	rcvr.transport = transport
	return
}

func (rcvr *TransportStrategy) Execute() {
	rcvr.transport.Start()
	rcvr.transport.GetInfo()
	rcvr.transport.Operate()
}

func (rcvr *TransportStrategy) Repair() {
	rcvr.transport.Repair()
}

func (rcvr *TransportStrategy) Stop() {
	rcvr.transport.Stop()
}
