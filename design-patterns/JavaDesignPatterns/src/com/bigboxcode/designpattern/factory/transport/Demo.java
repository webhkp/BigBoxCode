// Demo.java

package com.bigboxcode.designpattern.factory.transport;

public class Demo {
    public static void main(String[] args) {

        TransportFactory transportFactory = new TransportFactory();

        Transport transport1 = transportFactory.getTransport("bike");
        transport1.start();

        Transport transport2 = transportFactory.getTransport("car");
        transport2.start();

        Transport transport3 = transportFactory.getTransport("plane");
        transport3.start();

    }
}
