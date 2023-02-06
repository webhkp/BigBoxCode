package com.bigboxcode.designpattern.command.uielement;

import java.util.ArrayList;
import java.util.List;

public class UiControl {
    private List<UiCommand> commandList = new ArrayList<>();

    public void addElement(UiCommand command) {
        // Execute command
        command.print();

        // Store command in list to have a history
        commandList.add(command);
    }

    public void removeElement(UiCommand command) {
        // Remove element
        command.remove();

        // Store command in list to have a history
        commandList.remove(command);
    }

    public void undo() {
        UiCommand lastCommand = commandList.get(commandList.size() - 1);
        removeElement(lastCommand);
    }
}
