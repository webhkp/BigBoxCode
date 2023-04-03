// CsvDataExportDecorator.java

package com.bigboxcode.designpattern.decorator.dataexport;

public class CsvDataExportDecorator extends DataExportDecorator {
    public CsvDataExportDecorator(DataExport dataExporter) {
        super(dataExporter);
    }

    @Override
    public void processData() {
        dataExporter.processData();
        this.processCsv();
    }

    private void processCsv() {
        System.out.println("Processed data to CSV");
    }
}
