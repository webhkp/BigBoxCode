package com.bigboxcode.designpattern.decorator.dataexport;

public class SimpleDataExport implements DataExport {

    @Override
    public void processData() {
        System.out.println("Processing Data");
    }
}
