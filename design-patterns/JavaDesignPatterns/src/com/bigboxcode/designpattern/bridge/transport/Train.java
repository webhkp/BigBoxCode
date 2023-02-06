package com.bigboxcode.designpattern.bridge.transport;

public class Train extends Transport {

    public Train(Seat seat) {
        super(seat);
    }

    @Override
    public void selectTransport() {
        // Write code to select transport
        System.out.println("Train selected for transport");

        // Select seat
        seat.selectSeat();
    }
}
