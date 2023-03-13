// Demo.java

package com.bigboxcode.designpattern.state.state;

public class Demo {
    public static void main(String[] args) {
        Context context = new Context();
        new ConcreteStateOne(context);

        context.performActionOne();

        System.out.println("-------------------------------------------");

        new ConcreteStateTwo(context);

        context.performActionOne();
        context.performActionTwo();
    }
}
