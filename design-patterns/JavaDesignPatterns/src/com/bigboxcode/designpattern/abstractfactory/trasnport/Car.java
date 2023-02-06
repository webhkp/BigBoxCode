package com.bigboxcode.designpattern.abstractfactory.trasnport;

public class Car implements Transport {
    @Override
    public void start() {
        System.out.println("Car Started");
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
