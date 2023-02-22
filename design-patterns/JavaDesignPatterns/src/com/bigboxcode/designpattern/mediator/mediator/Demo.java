package com.bigboxcode.designpattern.mediator.mediator;

public class Demo {
    public static void main(String[] args) {
        Mediator mediator  = new Mediator();

        Colleague1 colleague1 = new Colleague1(mediator);
        Colleague2 colleague2 = new Colleague2(mediator);
        Colleague3 colleague3 = new Colleague3(mediator);

        colleague1.sendMessage(colleague2, "message from colleague1");

        System.out.println("-----------------------------------------------");

        colleague1.sendMessage(colleague3, "message from colleague1");

        System.out.println("-----------------------------------------------");

        colleague2.sendMessage(colleague3, "message from colleague2");

        System.out.println("-----------------------------------------------");

        colleague3.sendMessage(colleague1, "message from colleague3");

        System.out.println("-----------------------------------------------");

    }
}
