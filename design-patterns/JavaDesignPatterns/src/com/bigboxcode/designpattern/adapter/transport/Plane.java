package com.bigboxcode.designpattern.adapter.transport;

public class Plane  implements AirTransport {
    @Override
    public int getNumberOfWheels() {
        return 3;
    }

    @Override
    public int getNumberOfEngines() {
        return 2;
    }

    // get weight in pound
    @Override
    public double getWeight() {
        return 127_000;
    }

    // In Nautical miles
    @Override
    public double getDistanceTravelled() {
        return 500; // Nautical files
    }

    @Override
    public double getTravelCostTotal() {
        return 3_000;
    }
}