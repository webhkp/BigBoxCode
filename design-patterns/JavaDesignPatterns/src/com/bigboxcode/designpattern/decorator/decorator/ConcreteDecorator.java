// ConcreteDecorator.java

package com.bigboxcode.designpattern.decorator.decorator;

public class ConcreteDecorator extends Decorator {
    public ConcreteDecorator(Subject subject) {
        super(subject);
    }

    @Override
    public void operationOne() {
        // perform some additional operation if required

        subject.operationOne();

        // perform some additional operation if required

        System.out.println("Performing additional operation in Concrete Decorator");
    }
}
