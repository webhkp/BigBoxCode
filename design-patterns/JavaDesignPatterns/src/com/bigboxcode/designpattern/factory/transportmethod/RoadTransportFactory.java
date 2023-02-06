package com.bigboxcode.designpattern.factory.transportmethod;

public class RoadTransportFactory extends TransportFactory {
    @Override
    public Transport getTransport(String name) {
        if (name.equalsIgnoreCase("car")) {
            return new Car();
        }

        if (name.equalsIgnoreCase("bike")) {
            return new Bike();
        }

        if (name.equalsIgnoreCase("bus")) {
            return new Bus();
        }

        return null;
    }
}
