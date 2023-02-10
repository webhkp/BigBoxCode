package com.bigboxcode.designpattern.iterator.pagination;

import java.util.ArrayList;
import java.util.List;

public class PageList implements AbstractPageList {
    private List<Page> pages = new ArrayList<>();
    @Override
    public void add(Page page) {
        pages.add(page);
    }

    @Override
    public void remove(Page page) {
        pages.remove(page);
    }

    @Override
    public AbstractIterator iterator() {
        return new Iterator(pages);
    }
}
