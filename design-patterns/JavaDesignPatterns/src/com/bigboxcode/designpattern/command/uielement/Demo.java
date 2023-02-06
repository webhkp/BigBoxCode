package com.bigboxcode.designpattern.command.uielement;

public class Demo {
    public static void main(String[] args) {
        UiControl uiControl = new UiControl();

        UiCommand inputUi = new InputUi();
        UiCommand tableUi = new TableUi();
        UiCommand buttonUi = new ButtonUi("Submit");

        uiControl.addElement(inputUi);
        uiControl.addElement(tableUi);
        uiControl.addElement(buttonUi);

        // Remove specific element
        uiControl.removeElement(tableUi);

        // Add some new elements
        uiControl.addElement(new ButtonUi("Cancel"));
        uiControl.addElement(new TableUi());
        uiControl.addElement(new InputUi());
        uiControl.addElement(new ButtonUi("Wrong button"));

        // Undo last to command
        uiControl.undo();
        uiControl.undo();

    }
}
