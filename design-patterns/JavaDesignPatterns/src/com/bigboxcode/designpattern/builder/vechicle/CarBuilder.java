package com.bigboxcode.designpattern.builder.vechicle;

public class CarBuilder implements VehicleBuilder {
    private int wheel;
    private int engine;
    private int seat;
    private boolean interior;
    private int door;

    @Override
    public void addWheel(int noOfWheel) {
        System.out.println("Add " + noOfWheel + " wheels");

        this.wheel += noOfWheel;
    }

    @Override
    public void addEngine(int noOfEngine) {
        System.out.println("Add " + noOfEngine + " engine");

        this.engine += noOfEngine;
    }

    @Override
    public void addSeat(int noOfSeat) {
        System.out.println("Add " + noOfSeat + " Seat");

        this.seat = noOfSeat;
    }

    @Override
    public void addInterior() {
        System.out.println("Add interior");

        this.interior = true;
    }

    @Override
    public void addDoor(int noOfDoor) {
        System.out.println("Add " + noOfDoor + " door");

        this.door += noOfDoor;
    }

    @Override
    public void addWing(int noOfWings) throws Exception {
        throw new Exception("Can not add wings");
    }

    public Car build() {
        Car car = new Car(wheel, engine, seat, door, interior);

        return car;
    }

}
