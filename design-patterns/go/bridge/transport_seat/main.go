// main.go

package main

func main() {
	plane := NewPlane(NewBusinessClassSeat())
	plane.SelectTransport()

	plane2 := NewPlane(NewEconomyClassSeat())
	plane2.SelectTransport()

	train := NewTrain(NewEconomyClassSeat())
	train.SelectTransport()
}
