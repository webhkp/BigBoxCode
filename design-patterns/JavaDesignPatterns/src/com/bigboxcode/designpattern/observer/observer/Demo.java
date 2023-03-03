package com.bigboxcode.designpattern.observer.observer;

public class Demo {
    public static void main(String[] args) {
        Subject subject = new ConcreteSubject();

        new ObserverOne(subject);
        new ObserverTwo(subject);

        System.out.println("Setting subject value to 10");
        subject.setState(10);

        System.out.println("\n-----------------------------\n");

        System.out.println("Setting subject value to 999");
        subject.setState(999);
    }
}
