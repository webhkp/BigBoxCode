// main.go

package main

func main() {
	roadTransportFactory := NewRoadTransportFactory()
	airTransportFactory := NewAirTransportFactory()

	roadTransportFactory.OperateTransport("bus")
	airTransportFactory.OperateTransport("helicopter")
	roadTransportFactory.RepairTransport("bike")
}
