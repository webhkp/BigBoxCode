// economy_class_seat.go

package main

import "fmt"

type EconomyClassSeat struct {
}

func NewEconomyClassSeat() (economyClassSeat *EconomyClassSeat) {
	economyClassSeat = &EconomyClassSeat{}
	return
}

func (economyClassSeat *EconomyClassSeat) SelectSeat() {
	fmt.Println("Select an Economy class seat")
}
