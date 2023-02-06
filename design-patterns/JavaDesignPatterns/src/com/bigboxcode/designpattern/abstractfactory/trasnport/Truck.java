package com.bigboxcode.designpattern.abstractfactory.trasnport;

public class Truck implements Transport {
    @Override
    public void start() {
        System.out.println("Truck Started");
    }

    @Override
    public void stop() {
        System.out.println("Truck Stopped");
    }

    @Override
    public void repair() {
        System.out.println("Truck Repair");
    }
}
