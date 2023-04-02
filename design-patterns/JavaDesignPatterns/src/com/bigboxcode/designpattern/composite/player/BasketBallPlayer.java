// BasketballPlayer.java

package com.bigboxcode.designpattern.composite.player;

public class BasketBallPlayer implements Player {
        private String name;
        private int age;

        private int point;

    public BasketBallPlayer(String name, int age, int point) {
        this.name = name;
        this.age = age;
        this.point = point;
    }

    @Override
    public void printDetails() {
        System.out.println("Game: Basketball");
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Points: " + point);
    }
}
