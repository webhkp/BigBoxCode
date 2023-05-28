// main.go

package main

func main() {
	transportFactory := NewTransportFactory()
	transport1 := transportFactory.GetTransport("bike")
	transport1.Start()

	transport2 := transportFactory.GetTransport("car")
	transport2.Start()
	transport2.Stop()
	
	transport3 := transportFactory.GetTransport("plane")
	transport3.Start()
}