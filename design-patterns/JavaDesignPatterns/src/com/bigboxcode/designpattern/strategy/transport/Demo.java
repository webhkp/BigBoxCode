package com.bigboxcode.designpattern.strategy.transport;

public class Demo {
    public static void main(String[] args) {
        // Use bike
        System.out.println("Operating Bike:");

        TransportStrategy myTransport = new TransportStrategy(new Bike());
        myTransport.execute();
        myTransport.stop();

        // Use car
        System.out.println("\n\nOperating Car:");

        myTransport = new TransportStrategy(new Car());
        myTransport.execute();
        myTransport.stop();
        myTransport.repair();

        // Use plane
        System.out.println("\n\nOperating plane:");

        myTransport = new TransportStrategy(new Plane());
        myTransport.execute();
        myTransport.stop();


    }
}
