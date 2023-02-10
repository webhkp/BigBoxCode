package com.bigboxcode.designpattern.iterator.pagination;

import java.util.List;

public class Iterator implements AbstractIterator {
    private int currentPosition = 0;
    private final List<Page> pages;

    public Iterator(List<Page> pages) {
        this.pages = pages;
    }
    @Override
    public boolean hasNext() {
        return currentPosition < pages.size();
    }

    @Override
    public Page next() {
        Page page = pages.get(currentPosition);
        currentPosition++;

        return page;
    }
}
