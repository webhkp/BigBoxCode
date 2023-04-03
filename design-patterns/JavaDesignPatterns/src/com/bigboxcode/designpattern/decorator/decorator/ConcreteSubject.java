// ConcreteSubject.java

package com.bigboxcode.designpattern.decorator.decorator;

public class ConcreteSubject implements Subject {
    @Override
    public void operationOne() {
        System.out.println("Performing Operation One(1) in Subject");
    }

    @Override
    public void operationTwo() {
        System.out.println("Performing Operation Two(2) in Subject");
    }
}
