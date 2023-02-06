package com.bigboxcode.designpattern.prototype.transport;

public class Demo {
    public static void main(String[] args) {
        Car car1 = new Car();
        car1.make = 2014;
        car1.model = "ABCD";
        car1.color = "Red";

        System.out.println(car1);

        System.out.println("---------------------------------------");

        Car carClone = (Car) car1.clone();
        carClone.model = "Some Different Model";
        carClone.color = "White";

        System.out.println(carClone);
//        System.out.println("Make: " + busClone.make);
//        System.out.println("Model: " + busClone.getModel());
//        System.out.println("Color: " + busClone.getColor());

    }
}
