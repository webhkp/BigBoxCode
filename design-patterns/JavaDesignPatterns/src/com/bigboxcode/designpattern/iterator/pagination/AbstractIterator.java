package com.bigboxcode.designpattern.iterator.pagination;

public interface AbstractIterator {

    boolean hasNext();

    Page next();
}
