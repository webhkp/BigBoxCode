// TableCell.java
package com.bigboxcode.designpattern.flyweight.table;

public class TableCell {
    private int width;
    private String text;

    public TableCell(int width) {
        this.width = width;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void draw() {
       System.out.println("Drawing cell : width = " + width + " | text = " + text);
    }
}
