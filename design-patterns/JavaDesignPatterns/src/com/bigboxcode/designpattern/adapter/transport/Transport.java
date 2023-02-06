package com.bigboxcode.designpattern.adapter.transport;

public interface Transport {
    int getNumberOfWheels();

    double getWeight();

    // In miles
    double getDistanceTravelled();

    double getTravelCostPerMile();
}
