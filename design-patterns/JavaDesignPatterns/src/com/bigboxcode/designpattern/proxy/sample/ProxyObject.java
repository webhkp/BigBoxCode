package com.bigboxcode.designpattern.proxy.sample;

public class ProxyObject implements OperationInterface {
    public void ProxyObject() {

    }

    @Override
    public void request() {
        OperationInterface actualObject = new ActualObject();
        actualObject.request();
    }
}
