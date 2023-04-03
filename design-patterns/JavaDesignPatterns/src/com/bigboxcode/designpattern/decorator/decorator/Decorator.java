// Decorator.java

package com.bigboxcode.designpattern.decorator.decorator;

public abstract class Decorator implements Subject {

    protected final Subject subject;

    public Decorator(Subject subject) {
        this.subject = subject;
    }

    @Override
    public void operationOne() {
        this.subject.operationOne();
    }

    @Override
    public void operationTwo() {
        this.subject.operationTwo();
    }
}
