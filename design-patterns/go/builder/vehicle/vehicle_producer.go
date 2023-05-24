package main

type VehicleProducer struct {
}

func NewVehicleProducer() (vehicleProducer *VehicleProducer) {
	vehicleProducer = &VehicleProducer{}
	return
}

func (vehicleProducer *VehicleProducer) BuildCar(carBuilder *CarBuilder) *CarBuilder {
	carBuilder.AddWheel(4)
	carBuilder.AddEngine(1)
	carBuilder.AddDoor(4)
	carBuilder.AddSeat(4)
	carBuilder.AddInterior()
	return carBuilder
}

func (vehicleProducer *VehicleProducer) BuildPlane(planeBuilder *PlaneBuilder) *PlaneBuilder {
	planeBuilder.AddWheel(3)
	planeBuilder.AddEngine(2)
	planeBuilder.AddDoor(4)
	planeBuilder.AddSeat(120)
	planeBuilder.AddInterior()
	planeBuilder.AddWing(2)
	
	return planeBuilder
}
