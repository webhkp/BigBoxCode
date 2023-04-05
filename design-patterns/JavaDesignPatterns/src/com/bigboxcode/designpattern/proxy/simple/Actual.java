// Actual.java

package com.bigboxcode.designpattern.proxy.simple;

public class Actual implements ProxyInterface {

    @Override
    public void operation1() {
        System.out.println("Performing operation 1 in the Actual Object");
    }

    @Override
    public void operation2() {
        System.out.println("Performing operation 2 in the Actual Object");
    }

}
