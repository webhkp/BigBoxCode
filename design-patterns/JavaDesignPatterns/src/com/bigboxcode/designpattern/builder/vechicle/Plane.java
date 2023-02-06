package com.bigboxcode.designpattern.builder.vechicle;

public class Plane {
    private int wheel;
    private int engine;
    private int seat;
    private int door;
    private int wing;

    private boolean interior;

    public Plane(int noOfWheel, int noOfEngine, int noOfSeat, int noOfDoor, int wing, boolean interior) {
        this.wheel = noOfWheel;
        this.engine = noOfEngine;
        this.seat = noOfSeat;
        this.door = noOfDoor;
        this.wing = wing;
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

    public int getWing() {
        return wing;
    }

    public boolean isInterior() {
        return interior;
    }

    public String toString() {
        return "Plane: Wheel -> " + wheel + " | Engine -> " + engine + " | Seat -> " + seat + " | Door -> " + door + " | Wing: " + wing + " | Interior -> " + interior;
    }
}
