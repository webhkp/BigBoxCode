package com.bigboxcode.designpattern.factory.transportmethod;

public class Bike implements Transport {
    @Override
    public void start() {
        System.out.println("Bike started");
    }

    @Override
    public void stop() {
        System.out.println("Bike Stopped");
    }

    @Override
    public void repair() {
        System.out.println("Bike Repair");
    }
}