// Proxy.java

package com.bigboxcode.designpattern.proxy.simple;

public class Proxy implements ProxyInterface {
    private ProxyInterface actual;

    @Override
    public void operation1() {
         if (actual == null) {
             actual = new Actual();
         }

        actual.operation1();
    }

    @Override
    public void operation2() {
        if (actual == null) {
            actual = new Actual();
        }

        actual.operation2();
    }
}
