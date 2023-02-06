package com.bigboxcode.designpattern.factory.transportmethod;

public class Demo {
    public static void main(String[] args) {
        TransportFactory roadTransportFactory = new RoadTransportFactory();
        TransportFactory airTransportFactory = new AirTransportFactory();

        roadTransportFactory.operateTransport("bus");

        System.out.println("---------------------------------------");

        airTransportFactory.operateTransport("helicopter");

        System.out.println("---------------------------------------");

        roadTransportFactory.repairTransport("bike");
    }
}
