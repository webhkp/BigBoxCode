// busines_class_seat.go

package main

import "fmt"

type BusinessClassSeat struct {
}

func NewBusinessClassSeat() (businessClassSeat *BusinessClassSeat) {
	businessClassSeat = &BusinessClassSeat{}
	return
}

func (businessClassSeat *BusinessClassSeat) SelectSeat() {
	fmt.Println("Select a Business class seat")
}