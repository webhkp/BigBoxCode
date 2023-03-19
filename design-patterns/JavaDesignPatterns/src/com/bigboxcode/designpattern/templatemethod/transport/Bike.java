// Bike.java

package com.bigboxcode.designpattern.templatemethod.transport;

public class Bike extends Transport {
    @Override
    void createBody() {
        System.out.println("Creating Bike Body");
    }

    @Override
    void addEngine() {
        System.out.println("Adding Engine to Bike");
    }

    @Override
    void addWheel() {
        System.out.println("Adding 2 Wheels to Bike");
    }

    @Override
    void addWing() {
        // Not required for Bike
    }
}