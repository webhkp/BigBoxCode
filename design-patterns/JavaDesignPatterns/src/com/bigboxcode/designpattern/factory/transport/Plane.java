// Plane.java

package com.bigboxcode.designpattern.factory.transport;

public class Plane implements Transport {
    @Override
    public void start() {
        System.out.println("Plane started");
    }

    @Override
    public void stop() {
        System.out.println("Plane Stopped");
    }

    @Override
    public void repair() {
        System.out.println("Plane Repair");
    }
}