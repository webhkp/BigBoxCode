package com.bigboxcode.designpattern.composite.player;

import java.util.ArrayList;
import java.util.List;

public class PlayerGroup implements Player {
    private List<Player> playerList = new ArrayList<>();

    @Override
    public void printDetails() {
        for (Player player: playerList) {
            player.printDetails();
        }
    }

    public void addElement(Player transport) {
        playerList.add(transport);
    }

    public void removeElement(Player transport) {
        playerList.remove(transport);
    }
}