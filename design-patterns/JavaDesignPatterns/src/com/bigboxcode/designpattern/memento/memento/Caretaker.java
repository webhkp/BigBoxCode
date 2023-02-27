package com.bigboxcode.designpattern.memento.memento;

import java.util.ArrayList;
import java.util.List;

public class Caretaker {

    private List<Memento> mementoList = new ArrayList<>();

    public void add(Memento memento) {
        mementoList.add(memento);
    }

    public Memento getByIndex(int index) {
        return mementoList.get(index);
    }

    public Memento getCurrent() {
        return mementoList.get(mementoList.size() - 1);
    }

    public void undo() {
        mementoList.remove(mementoList.size() - 1);
    }
}
