
package com.bigboxcode.designpattern.strategy.transport;

public class Car implements Transport {
    @Override
    public void start() {
        System.out.println("Car started");
    }

    @Override
    public void stop() {
        System.out.println("Car stopped");
    }

    @Override
    public void repair() {
        System.out.println("Car repair");
    }

    @Override
    public void getInfo() {
        System.out.println("Transport type: Car");
        System.out.println("Number of wheels: 4");
        System.out.println("Average Weight: 4,000 Pounds");
    }

    @Override
    public void operate() {
        System.out.println("Driving car ............");
    }
}
