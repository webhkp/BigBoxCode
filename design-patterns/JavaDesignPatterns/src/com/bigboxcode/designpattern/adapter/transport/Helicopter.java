package com.bigboxcode.designpattern.adapter.transport;

public class Helicopter implements AirTransport {
    @Override
    public int getNumberOfWheels() {
        return 0;
    }

    @Override
    public int getNumberOfEngines() {
        return 1;
    }

    // Get weight in LB
    @Override
    public double getWeight() {
        return 12_000;
    }

    // In Nautical miles
    @Override
    public double getDistanceTravelled() {
        return 180; // nautical miles
    }

    @Override
    public double getTravelCostTotal() {
        return 20_000;
    }
}
