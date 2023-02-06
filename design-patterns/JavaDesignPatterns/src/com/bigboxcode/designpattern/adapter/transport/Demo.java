package com.bigboxcode.designpattern.adapter.transport;

public class Demo {
    public static void main(String[] args) {

        System.out.println("Get information of Bus travel...");

        Bus bus = new Bus();
        System.out.println("\nNumber of wheels: " + bus.getNumberOfWheels());
        System.out.println("Weight(kg): " + bus.getWeight());
        System.out.println("Distance(miles): " + bus.getDistanceTravelled());
        System.out.println("Cost per mile: " + bus.getTravelCostPerMile());

        System.out.println("\n\n-------------------------------------------\n\n");

        System.out.println("Get information of Plane travel...");

        AirTransportAdapter planeTransport = new AirTransportAdapter(new Plane());
        System.out.println("\nNumber of wheels: " + planeTransport.getNumberOfWheels());
        System.out.println("Weight(kg): " + planeTransport.getWeight());
        System.out.println("Distance(miles): " + planeTransport.getDistanceTravelled());
        System.out.println("Cost per mile: " + planeTransport.getTravelCostPerMile());
    }
}
