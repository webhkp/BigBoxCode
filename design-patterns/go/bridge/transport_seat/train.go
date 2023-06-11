// train.go

package main

import "fmt"

type Train struct {
	seat Seat
}

func NewTrain(seat Seat) (train *Train) {
	train = &Train{}
	train.seat =  seat
	return
}

func (train *Train) SelectTransport() {
	fmt.Println("Train selected for transport")
	
	train.seat.SelectSeat()
}
