// main.go

package main

import (
	"fmt"
	"reflect"
)

func main() {
	roadTransportFactory := NewRoadTransportFactory()
	fmt.Println(reflect.TypeOf(roadTransportFactory))
	airTransportFactory := NewAirTransportFactory()

	roadTransportFactory.OperateTransport("bus")
	airTransportFactory.OperateTransport("helicopter")
	roadTransportFactory.RepairTransport("bike")
}