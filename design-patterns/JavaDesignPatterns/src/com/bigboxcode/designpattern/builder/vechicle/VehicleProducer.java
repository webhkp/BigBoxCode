package com.bigboxcode.designpattern.builder.vechicle;

public class VehicleProducer {
    public CarBuilder buildCar(CarBuilder carBuilder) {
        carBuilder.addWheel(4);
        carBuilder.addEngine(1);
        carBuilder.addDoor(4);
        carBuilder.addSeat(4);
        carBuilder.addInterior();

        return carBuilder;
    }

    public PlaneBuilder buildPlane(PlaneBuilder planeBuilder) {
        planeBuilder.addWheel(3);
        planeBuilder.addEngine(2);
        planeBuilder.addDoor(4);
        planeBuilder.addSeat(120);
        planeBuilder.addInterior();
        try {
            planeBuilder.addWing(2);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return planeBuilder;
    }
}
