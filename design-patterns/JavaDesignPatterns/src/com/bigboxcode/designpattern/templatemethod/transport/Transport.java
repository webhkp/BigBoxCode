// Transport.java

package com.bigboxcode.designpattern.templatemethod.transport;

public abstract class Transport {
    abstract void createBody();

    abstract void addEngine();

    abstract void addWheel();

    // Required only for Plane
    abstract void addWing();


    private void addSeat() {
        // Add seats to the vehicle

        // Adding seats are same for all transports so same functions for all

        System.out.println("Adding seats");
    }

    public void build() {
        createBody();

        addEngine();

        addWheel();

        addWing();

        addSeat();
    }
}
