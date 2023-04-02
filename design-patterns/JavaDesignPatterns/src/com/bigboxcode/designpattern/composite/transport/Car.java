// Car.java

package com.bigboxcode.designpattern.composite.transport;

public class Car implements Transport {
    @Override
    public void start() {
        System.out.println("Starting Car...");
    }

    @Override
    public void operate() {
        System.out.println("Driving Car");
    }

    @Override
    public void stop() {
        System.out.println("Stopping Car...");
    }
}
