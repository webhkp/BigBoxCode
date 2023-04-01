// Bike.java

package com.bigboxcode.designpattern.adapter.transport;

public class Bike implements Transport {
    @Override
    public int getNumberOfWheels() {
        return 2;
    }

    @Override
    public double getWeight() {
        return 700;
    }

    @Override
    public double getDistanceTravelled() {
        return 80;
    }

    @Override
    public double getTravelCostPerMile() {
        return 4;
    }
}
