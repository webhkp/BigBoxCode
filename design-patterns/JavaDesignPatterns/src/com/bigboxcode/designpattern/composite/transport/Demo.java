// Demo.java

package com.bigboxcode.designpattern.composite.transport;

public class Demo {
    public static void main(String[] args) {
        Bike bike = new Bike();
        Plane plane = new Plane();
        Car car = new Car();
        Car secondCar = new Car();

        TransportGroup transports = new TransportGroup();
        transports.addTransport(bike);
        transports.addTransport(plane);
        transports.addTransport(car);
        transports.addTransport(secondCar);

        System.out.println("-----------------Output with 4 transports------------------\n");

        transports.start();
        transports.operate();
        transports.stop();

        System.out.println("\n-----------------Output when plane is removed------------------\n");

        transports.removeTransport(plane);

        transports.start();
        transports.operate();
        transports.stop();
    }
}
