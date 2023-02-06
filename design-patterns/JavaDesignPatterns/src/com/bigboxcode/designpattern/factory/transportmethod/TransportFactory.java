package com.bigboxcode.designpattern.factory.transportmethod;

public abstract class TransportFactory {
    public void operateTransport(String name) {
        Transport transport = getTransport(name);

        transport.start();
        transport.stop();
    }

    public void repairTransport(String name) {
        Transport transport = getTransport(name);

        transport.repair();
    }

    public abstract Transport getTransport(String name);
}
