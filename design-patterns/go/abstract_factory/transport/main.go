// main.go

package main

func main() {
	transportFactoryProducer := NewTransportFactoryProducer()

	twoWheelFactory, err := transportFactoryProducer.GetFactory(2)

	if err == nil {
		bicycle, err := twoWheelFactory.GetTransport("bicycle")

		if err == nil {
			bicycle.Start()
		}
	}

	fourWheelFactory, err := transportFactoryProducer.GetFactory(4)

	if err == nil {
		truck, err := fourWheelFactory.GetTransport("truck")

		if err == nil {
			truck.Start()
			truck.Stop()
			truck.Repair()
		}
	}
}