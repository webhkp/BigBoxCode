package com.bigboxcode.designpattern.prototype.transport;

public class Car implements Prototype {
    public int make;
    public String model;
    public String color;

    public Car() {

    }

    public Car(Car car) {
        this.make = car.make;
        this.model = car.model;
        this.color = car.color;
    }

    @Override
    public Prototype clone() {
        return new Car(this);
    }

    public String toString() {
        return "Make: " + make + " | Model: " + model + " | Color: " + color;
    }

}
