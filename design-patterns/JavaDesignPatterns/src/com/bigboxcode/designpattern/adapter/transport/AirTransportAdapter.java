package com.bigboxcode.designpattern.adapter.transport;

public class AirTransportAdapter implements Transport {
    private final AirTransport airTransport;

    public AirTransportAdapter(AirTransport airTransport) {
        this.airTransport = airTransport;
    }

    @Override
    public int getNumberOfWheels() {
        return this.airTransport.getNumberOfWheels();
    }

    @Override
    public double getWeight() {
        return this.airTransport.getWeight();
    }

    @Override
    public double getDistanceTravelled() {
        // Convert nautical mile to mile and return
        double distanceInNauticalMile = this.airTransport.getDistanceTravelled();

        return distanceInNauticalMile * 1.151;
    }

    @Override
    public double getTravelCostPerMile() {
        // calculate cost per mile from total cost
        double totalCost = this.airTransport.getTravelCostTotal();

        return totalCost / this.getDistanceTravelled();
    }
}