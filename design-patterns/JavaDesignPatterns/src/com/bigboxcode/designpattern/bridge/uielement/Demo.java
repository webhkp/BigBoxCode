package com.bigboxcode.designpattern.bridge.uielement;

public class Demo {
    public static void main(String args[]) {
        // Print a Red table
        UIElement table = new Table(new Red());
        table.printElement();

        // Separator for clear view of demo result
        System.out.println("\n------------------------------\n");

        // Print a Green Input box
        UIElement input = new Input(new Green());
        input.printElement();

        // Separator for clear view of demo result
        System.out.println("\n------------------------------\n");

        // Print a Blue Button
        UIElement button = new Button(new Blue());
        button.printElement();

        // Separator for clear view of demo result
        System.out.println("\n------------------------------\n");

        // Print a Red Button
        UIElement button2 = new Button(new Red());
        button2.printElement();
    }
}
