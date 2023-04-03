// ExcelDataExportDecorator.java

package com.bigboxcode.designpattern.decorator.dataexport;

public class ExcelDataExportDecorator extends DataExportDecorator {
    public ExcelDataExportDecorator(DataExport dataExporter) {
        super(dataExporter);
    }

    @Override
    public void processData() {
        dataExporter.processData();
        this.processExcel();
    }

    private void processExcel() {
        System.out.println("Processed data to Excel");
    }
}