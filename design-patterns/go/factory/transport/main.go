// main.go

package main

func main() {
	transportFactory := NewTransportFactory()
	transport1, err := transportFactory.GetTransport("bike")

	if err == nil {
		transport1.Start()
	}

	transport2, err := transportFactory.GetTransport("car")

	if err == nil {
		transport2.Start()
		transport2.Stop()
	}
	
	transport3, err := transportFactory.GetTransport("plane")
	
	if err == nil {
		transport3.Start()
	}
}