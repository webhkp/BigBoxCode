package com.bigboxcode.designpattern.abstractfactory.trasnport;

public class TwoWheelTransportFactory implements AbstractTransportFactory{
    @Override
    public Transport getTransport(String type) {

        if (type.equalsIgnoreCase("bicycle")) {
            return new Bicycle();
        }

        if (type.equalsIgnoreCase("motorcycle")) {
            return new Motorcycle();
        }

        return null;
    }
}
