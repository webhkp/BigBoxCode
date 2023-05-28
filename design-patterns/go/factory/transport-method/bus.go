// bus.go

package main

import "fmt"

type Bus struct {
}

func NewBus() (bus *Bus) {
	bus = &Bus{}
	return
}

func (bus *Bus) Repair() {
	fmt.Println("Bus Repair")
}

func (bus *Bus) Start() {
	fmt.Println("Bus started")
}

func (bus *Bus) Stop() {
	fmt.Println("Bus Stopped")
}