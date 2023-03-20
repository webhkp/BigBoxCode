// TransportFactory.java

package com.bigboxcode.designpattern.factory.transport;

public class TransportFactory {
    public Transport getTransport(String type) {
        if (type == null) {
            return null;
        }

        if (type.equalsIgnoreCase("bike")) {
            return new Bike();
        }

        if (type.equalsIgnoreCase("car")) {
            return new Car();
        }

        if (type.equalsIgnoreCase("plane")) {
            return new Plane();
        }

        return null;
    }
}