// transport_group.go

package main

type TransportGroup struct {
	transportList []Transport
}

func NewTransportGroup() (transportGroup *TransportGroup) {
	transportGroup = &TransportGroup{}
	// transportGroup.transportList = NewArrayList()
	return
}

func (transportGroup *TransportGroup) AddTransport(transport Transport) {
	transportGroup.transportList = append(transportGroup.transportList, transport)
}

func (transportGroup *TransportGroup) Operate() {
	for _, transport := range transportGroup.transportList {
		transport.Operate()
	}
}

func (transportGroup *TransportGroup) RemoveTransport(transport Transport) {
	newTransportGroup := []Transport{}

	for _, currentTransport := range transportGroup.transportList {
		if currentTransport == transport {
			continue
		}

		newTransportGroup = append(newTransportGroup, currentTransport)
	}

	transportGroup.transportList = newTransportGroup
}

func (transportGroup *TransportGroup) Start() {
	for _, transport := range transportGroup.transportList {
		transport.Start()
	}
}

func (transportGroup *TransportGroup) Stop() {
	for _, transport := range transportGroup.transportList {
		transport.Stop()
	}
}
