package com.bigboxcode.designpattern.bridge.transport;

public class Plane extends Transport {

    public Plane(Seat seat) {
        super(seat);
    }

    @Override
    public void selectTransport() {
        // Write code to select transport
        System.out.println("Plane selected for transport");

        // Select seat
        seat.selectSeat();
    }
}
