package com.bigboxcode.designpattern.bridge.transport;

public abstract class Transport {

    protected Seat seat;

    public Transport(Seat seat) {
        this.seat = seat;
    }

    public abstract void selectTransport();
}
