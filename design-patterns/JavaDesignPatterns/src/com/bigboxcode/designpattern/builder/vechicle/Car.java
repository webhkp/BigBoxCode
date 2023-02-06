package com.bigboxcode.designpattern.builder.vechicle;

public class Car {
    private int wheel;
    private int engine;
    private int seat;
    private int door;

    private boolean interior;

    public Car(int noOfWheel, int noOfEngine, int noOfSeat, int noOfDoor, boolean interior) {
        this.wheel = noOfWheel;
        this.engine = noOfEngine;
        this.seat = noOfSeat;
        this.door = noOfDoor;
        this.interior = interior;
    }

    public int getWheel() {
        return wheel;
    }

    public int getEngine() {
        return engine;
    }

    public int getSeat() {
        return seat;
    }

    public int getDoor() {
        return door;
    }

    public boolean isInterior() {
        return interior;
    }

    public String toString() {
        return "Car: Wheel -> " + wheel + " | Engine -> " + engine + " | Seat -> " + seat + " | Door -> " + door + " | Interior -> " + interior;
    }
}
