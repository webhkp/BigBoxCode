package com.bigboxcode.designpattern.memento.memento;

public class Demo {

    public static void main(String[] args) throws InterruptedException {
        Caretaker caretaker = new Caretaker();
        Originator originator = new Originator();

        originator.setState("Time - 1 : " + System.currentTimeMillis());
        caretaker.add(originator.setMemento());

        // Add delay if required for testing
         Thread.sleep(1000);

        originator.setState("Time - 2 : " + System.currentTimeMillis());
        caretaker.add(originator.setMemento());

        // Add delay if required for testing
         Thread.sleep(1000);

        originator.setState("Time - 3 : " + System.currentTimeMillis());
        caretaker.add(originator.setMemento());

        System.out.println("---------------------------------------------");
        System.out.println("Check state at index 1 (index starts at 0):");

        Memento stateAtIndex1 = caretaker.getByIndex(1);
        System.out.println(stateAtIndex1.getState());

        System.out.println("---------------------------------------------");
        System.out.println("Check last state:");

        Memento lastState = caretaker.getCurrent();
        System.out.println(lastState.getState());

        System.out.println("---------------------------------------------");
        System.out.println("Undoing last state");

        caretaker.undo();

        System.out.println("---------------------------------------------");
        System.out.println("Check last state after undo:");

        Memento lastStateAfterUndo = caretaker.getCurrent();
        System.out.println(lastStateAfterUndo.getState());
    }

}
