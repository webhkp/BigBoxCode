// plane.go

package main

import "fmt"

type Plane struct {
	seat Seat
}

func NewPlane(seat Seat) (plane *Plane) {
	plane = &Plane{}
	plane.seat = seat
	return
}

func (plane *Plane) SelectTransport() {
	fmt.Println("Plane selected for transport")
	
	plane.seat.SelectSeat()
}
