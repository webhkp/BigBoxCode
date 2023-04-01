// Bus.java

package com.bigboxcode.designpattern.adapter.transport;

public class Bus implements Transport {
    @Override
    public int getNumberOfWheels() {
        return 4;
    }

    @Override
    public double getWeight() {
        return 10_000;
    }

    @Override
    public double getDistanceTravelled() {
        return 1_000;
    }

    @Override
    public double getTravelCostPerMile() {
        return 5;
    }
}
