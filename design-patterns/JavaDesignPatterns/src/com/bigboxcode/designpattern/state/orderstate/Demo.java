// Demo.java

package com.bigboxcode.designpattern.state.orderstate;

public class Demo {
    public static void main(String[] args) {
        OrderContext order = new OrderContext();

        order.runNextProcess();
        order.runNextProcess();
        order.runNextProcess();
        order.runNextProcess();

        // Trying to process after all steps are complete
        order.runNextProcess();
    }
}
