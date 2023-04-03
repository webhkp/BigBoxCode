// Demo.java

package com.bigboxcode.designpattern.decorator.decorator;

public class Demo {

    public static void main(String[] args) {
        Decorator someDecorator = new ConcreteDecorator(new ConcreteSubject());

        someDecorator.operationOne();
    }
}
