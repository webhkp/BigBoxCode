package com.bigboxcode.designpattern.bridge.transport;

public class BusinessClassSeat implements Seat {
    @Override
    public void selectSeat() {
        System.out.println("Select an Business class seat");
    }
}
