package com.bigboxcode.designpattern.templatemethod.transport;

public class Demo {
    public static void main(String[] args) {

        Transport car = new Car();
        car.build();

        Transport plane = new Plane();
        plane.build();
    }
}
