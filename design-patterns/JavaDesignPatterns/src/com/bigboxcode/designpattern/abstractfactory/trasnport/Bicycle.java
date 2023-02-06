package com.bigboxcode.designpattern.abstractfactory.trasnport;

public class Bicycle implements Transport {
    @Override
    public void start() {
        System.out.println("Bicycle Started");
    }

    @Override
    public void stop() {
        System.out.println("Bicycle Stopped");
    }

    @Override
    public void repair() {
        System.out.println("Bicycle Repair");
    }
}
