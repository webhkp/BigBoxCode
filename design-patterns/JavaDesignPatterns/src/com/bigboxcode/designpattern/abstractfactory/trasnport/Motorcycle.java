package com.bigboxcode.designpattern.abstractfactory.trasnport;

public class Motorcycle implements Transport {
    @Override
    public void start() {
        System.out.println("Motorcycle Started");
    }

    @Override
    public void stop() {
        System.out.println("Motorcycle Stopped");
    }

    @Override
    public void repair() {
        System.out.println("Motorcycle Repair");
    }
}
