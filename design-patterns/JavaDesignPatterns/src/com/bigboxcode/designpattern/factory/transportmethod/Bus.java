package com.bigboxcode.designpattern.factory.transportmethod;

public class Bus implements Transport {
    @Override
    public void start() {
        System.out.println("Bus started");
    }

    @Override
    public void stop() {
        System.out.println("Bus Stopped");
    }

    @Override
    public void repair() {
        System.out.println("Bus Repair");
    }
}