package com.bigboxcode.designpattern.abstractfactory.trasnport;

public class FactoryProducer {

    public static AbstractTransportFactory getFactory(int numberOfWheels) {

        if (numberOfWheels == 2) {
            return new TwoWheelTransportFactory();
        }

        if (numberOfWheels == 4) {
            return new FourWheelTransportFactory();
        }

        return null;
    }
}
