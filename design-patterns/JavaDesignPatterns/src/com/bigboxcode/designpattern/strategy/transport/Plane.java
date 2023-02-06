package com.bigboxcode.designpattern.strategy.transport;

import com.bigboxcode.Transport;

public class Plane implements Transport {

    @Override
    public void start() {
        System.out.println("Plane started");
    }

    @Override
    public void stop() {
        System.out.println("Plane stopped");
    }

    @Override
    public void repair() {
        System.out.println("Plane repair");
    }

    @Override
    public void getInfo() {
        System.out.println("Transport type: Plane");
        System.out.println("Number of wheels: 3");
        System.out.println("Average Weight: 50,000 Pounds");
    }

    @Override
    public void operate() {
        System.out.println("Flying plane ............");
    }
}
