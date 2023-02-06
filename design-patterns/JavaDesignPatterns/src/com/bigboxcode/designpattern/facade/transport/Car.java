// Car.java
// All function implementations are dummy implementations, just to demonstrate Facade

package com.bigboxcode.designpattern.facade.transport;

import java.util.Random;

public class Car {

    public void startEngine() {
        System.out.println("Start Engine");
    }

    public void stopEngine() {
        System.out.println("Stop Engine");
    }

    public void goStraight() {
        System.out.println("Go Straight: ↑");
    }

    public void goLeft() {
        System.out.println("Go Left: ←");
    }

    public void goRight() {
        System.out.println("Go Right: →");
    }

    public double getDistanceTravelled() {
        Random r = new Random();
        return (r.nextInt((int)((10000-100)*10+1))+100*10) / 10.0;
    }
}