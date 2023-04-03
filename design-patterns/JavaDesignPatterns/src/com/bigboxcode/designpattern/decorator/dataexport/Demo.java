// Demo.java

package com.bigboxcode.designpattern.decorator.dataexport;

public class Demo {
    public static void main(String[] args) {
        DataExport csvDataExport = new CsvDataExportDecorator(new SimpleDataExport());
        csvDataExport.processData();

        DataExport excelDataExport = new ExcelDataExportDecorator(new SimpleDataExport());
        excelDataExport.processData();

        DataExport jsonDataExport = new JsonDataExportDecorator(new SimpleDataExport());
        jsonDataExport.processData();
    }
}
