// helicopter.go

package main

import "fmt"

type Helicopter struct {
}

func NewHelicopter() (helicopter *Helicopter) {
	helicopter = &Helicopter{}
	return
}

func (helicopter *Helicopter) Repair() {
	fmt.Println("Helicopter Repair")
}

func (helicopter *Helicopter) Start() {
	fmt.Println("Helicopter started")
}

func (helicopter *Helicopter) Stop() {
	fmt.Println("Helicopter Stopped")
}
