package com.bigboxcode.designpattern.builder.vechicle;

public class Demo {
    public static void main(String[] args) {
        VehicleProducer vehicleProducer = new VehicleProducer();

        System.out.println("Building Car:\n");

        CarBuilder carBuilder = new CarBuilder();
        vehicleProducer.buildCar(carBuilder);

        Car car = carBuilder.build();
        System.out.println("\nFinal result:\n" + car);

        System.out.println("----------------------------");

        System.out.println("Building Car:\n");

        PlaneBuilder planeBuilder = new PlaneBuilder();
        vehicleProducer.buildPlane(planeBuilder);

        Plane plane = planeBuilder.build();
        System.out.println("\nFinal result:\n" + plane);

    }
}
