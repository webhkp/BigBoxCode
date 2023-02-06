package com.bigboxcode.designpattern.strategy.transport;

import com.bigboxcode.Transport;

public class Bike implements Transport {

    @Override
    public void start() {
        System.out.println("Bike started");
    }

    @Override
    public void stop() {
        System.out.println("Bike stopped");
    }

    @Override
    public void repair() {
        System.out.println("Bike repair");
    }

    @Override
    public void getInfo() {
        System.out.println("Transport type: Bike");
        System.out.println("Number of wheels: 2");
        System.out.println("Average Weight: 700 Pounds");
    }

    @Override
    public void operate() {
        System.out.println("Riding Bike ............");
    }
}
