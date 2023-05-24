// vehicle_builder.go

package main

type VehicleBuilder interface {
	AddDoor(noOfDoor int)
	AddEngine(noOfEngine int)
	AddInterior()
	AddSeat(noOfSeat int)
	AddWheel(noOfWheel int)
	AddWing(noOfWing int)
}
