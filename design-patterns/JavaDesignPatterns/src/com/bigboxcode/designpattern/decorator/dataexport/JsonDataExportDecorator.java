// JsonDataExportDecorator.java

package com.bigboxcode.designpattern.decorator.dataexport;

public class JsonDataExportDecorator extends DataExportDecorator {
    public JsonDataExportDecorator(DataExport dataExporter) {
        super(dataExporter);
    }

    @Override
    public void processData() {
        dataExporter.processData();
        this.processJson();
    }

    private void processJson() {
        System.out.println("Processed data to JSON");
    }
}