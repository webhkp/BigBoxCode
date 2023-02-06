package com.bigboxcode.designpattern.factory.transportmethod;

public class Car implements Transport {
    @Override
    public void start() {
        System.out.println("Car started");
    }

    @Override
    public void stop() {
        System.out.println("Car Stopped");
    }

    @Override
    public void repair() {
        System.out.println("Car Repair");
    }
}