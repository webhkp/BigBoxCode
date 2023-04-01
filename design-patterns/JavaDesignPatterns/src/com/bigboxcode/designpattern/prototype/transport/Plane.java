// Plane.java

package com.bigboxcode.designpattern.prototype.transport;

public class Plane implements Prototype {
    public String model;
    public String color;

    public Plane() {

    }

    public Plane(Plane plane) {
        this.model = plane.model;
        this.color = plane.color;
    }

    @Override
    public Prototype clone() {
        return new Plane(this);
    }

    public String toString() {
        return "Model: " + model + " | Color: " + color;
    }
}
