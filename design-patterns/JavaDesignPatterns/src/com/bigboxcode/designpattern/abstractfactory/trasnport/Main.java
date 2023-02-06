package com.bigboxcode.designpattern.abstractfactory.trasnport;

public class Main {

    public static void main(String[] args) {

        AbstractTransportFactory transportFactory1 = FactoryProducer.getFactory(2);
        Transport transport1 = transportFactory1.getTransport("bicycle");

        transport1.start();

        AbstractTransportFactory transportFactory2 = FactoryProducer.getFactory(4);
        Transport transport2 = transportFactory2.getTransport("truck");

        transport2.start();
    }
}
