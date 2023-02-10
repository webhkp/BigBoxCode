package com.bigboxcode.designpattern.iterator.pagination;

public class Page {
    private int number;
    private String path;


    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public String getPath() {
        if (path == null) {
            return "/page/" + number;
        }

        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
