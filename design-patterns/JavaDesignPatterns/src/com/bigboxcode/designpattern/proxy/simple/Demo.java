// Demo.java

package com.bigboxcode.designpattern.proxy.simple;

public class Demo {
    public static void main(String[] args) {
        ProxyInterface proxy = new Proxy();
        proxy.operation1();
        proxy.operation2();
    }

}
