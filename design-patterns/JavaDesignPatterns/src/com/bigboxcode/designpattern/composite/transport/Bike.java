package com.bigboxcode.designpattern.composite.transport;

public class Bike implements Transport{
    @Override
    public void start() {
        System.out.println("Starting Bike...");
    }

    @Override
    public void operate() {
        System.out.println("Riding Bike");
    }

    @Override
    public void stop() {
        System.out.println("Stopping Bike...");
    }
}
