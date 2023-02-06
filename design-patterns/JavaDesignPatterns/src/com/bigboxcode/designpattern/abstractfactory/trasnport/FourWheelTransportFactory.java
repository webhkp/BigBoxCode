package com.bigboxcode.designpattern.abstractfactory.trasnport;

public class FourWheelTransportFactory implements AbstractTransportFactory{
    @Override
    public Transport getTransport(String type) {

        if (type.equalsIgnoreCase("car")) {
            return new Car();
        }

        if (type.equalsIgnoreCase("truck")) {
            return new Truck();
        }

        return null;
    }
}
