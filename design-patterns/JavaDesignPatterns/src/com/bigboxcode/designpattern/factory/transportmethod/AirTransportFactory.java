package com.bigboxcode.designpattern.factory.transportmethod;

public class AirTransportFactory extends TransportFactory {
    @Override
    public Transport getTransport(String name) {
        if (name.equalsIgnoreCase("plane")) {
            return new Plane();
        }

        if (name.equalsIgnoreCase("helicopter")) {
            return new Helicopter();
        }

        return null;
    }
}
