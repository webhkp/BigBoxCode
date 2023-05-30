// bicycle.go

package main

import "fmt"

type Bicycle struct {
}

func NewBicycle() (bicycle *Bicycle) {
	bicycle = &Bicycle{}
	return
}

func (bicycle *Bicycle) Start() {
	fmt.Println("Bicycle Started")
}

func (bicycle *Bicycle) Stop() {
	fmt.Println("Bicycle Stopped")
}

func (bicycle *Bicycle) Repair() {
	fmt.Println("Bicycle Repair")
}
