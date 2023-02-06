package com.bigboxcode.designpattern.bridge.transport;

public class Demo {
    public static void main(String args[]) {
        Transport plane = new Plane(new BusinessClassSeat());
        plane.selectTransport();

        // Separator for clear view of demo result
        System.out.println("\n------------------------------\n");

        Transport plane2 = new Plane(new EconomyClassSeat());
        plane2.selectTransport();

        // Separator for clear view of demo result
        System.out.println("\n------------------------------\n");

        Transport train = new Train(new EconomyClassSeat());
        train.selectTransport();
    }
}
