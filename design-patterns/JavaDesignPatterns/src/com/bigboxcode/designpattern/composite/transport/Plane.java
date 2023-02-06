package com.bigboxcode.designpattern.composite.transport;

public class Plane implements Transport {
    @Override
    public void start() {
        System.out.println("Starting Plane...");
    }

    @Override
    public void operate() {
        System.out.println("Flying Plane");
    }

    @Override
    public void stop() {
        System.out.println("Stopping Plane...");
    }
}
