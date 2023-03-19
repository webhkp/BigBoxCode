// Plane.java

package com.bigboxcode.designpattern.templatemethod.transport;

public class Plane  extends Transport {
    @Override
    void createBody() {
        System.out.println("Creating Plane Body");
    }

    @Override
    void addEngine() {
        System.out.println("Adding Engine to Plane");
    }

    @Override
    void addWheel() {
        System.out.println("Adding 3 Wheels to Plane");
    }

    @Override
    void addWing() {
        System.out.println("Adding Wings Plane");
    }
}