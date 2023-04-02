// CricketPlayer.java

package com.bigboxcode.designpattern.composite.player;

public class CricketPlayer implements Player {
    private String name;
    private int age;

    private int run;

    public CricketPlayer(String name, int age, int run) {
        this.name = name;
        this.age = age;
        this.run = run;
    }

    @Override
    public void printDetails() {
        System.out.println("Game: Cricket");
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Runs: " + run);
    }
}