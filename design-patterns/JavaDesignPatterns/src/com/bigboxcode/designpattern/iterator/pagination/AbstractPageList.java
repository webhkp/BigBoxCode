package com.bigboxcode.designpattern.iterator.pagination;

public interface AbstractPageList {
    void add(Page page);
    void remove(Page page);

    AbstractIterator iterator();
}
