package com.bigboxcode.designpattern.bridge.transport;

public class EconomyClassSeat implements Seat{
    @Override
    public void selectSeat() {
        System.out.println("Select an Economy class seat");
    }
}
