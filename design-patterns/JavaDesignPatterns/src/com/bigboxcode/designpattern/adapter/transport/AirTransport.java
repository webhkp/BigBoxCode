package com.bigboxcode.designpattern.adapter.transport;

public interface AirTransport {
    int getNumberOfWheels();

    int getNumberOfEngines();

    double getWeight();

    // In Nautical miles
    double getDistanceTravelled();

    double getTravelCostTotal();

}
