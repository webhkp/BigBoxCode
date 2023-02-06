package com.bigboxcode.designpattern.strategy.transport;

public class TransportStrategy {
    private final Transport transport;

    public TransportStrategy(Transport transport) {
        this.transport = transport;
    }

    public void execute() {
        this.transport.start();

        this.transport.getInfo();

        this.transport.operate();
    }

    public void repair() {
        this.transport.repair();
    }

    public void stop() {
        this.transport.stop();
    }
}
