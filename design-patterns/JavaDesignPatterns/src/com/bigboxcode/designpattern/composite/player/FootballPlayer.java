// FootballPlayer.java

package com.bigboxcode.designpattern.composite.player;

public class FootballPlayer implements Player {
    private String name;
    private int age;

    private int goal;

    public FootballPlayer(String name, int age, int goal) {
        this.name = name;
        this.age = age;
        this.goal = goal;
    }

    @Override
    public void printDetails() {
        System.out.println("Game: Football");
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Goals: " + goal);
    }
}
