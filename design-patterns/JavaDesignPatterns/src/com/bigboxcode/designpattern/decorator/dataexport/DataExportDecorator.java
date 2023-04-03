// DataExportDecorator.java

package com.bigboxcode.designpattern.decorator.dataexport;

public abstract class DataExportDecorator implements DataExport {
    protected final DataExport dataExporter;

    public DataExportDecorator(DataExport dataExporter) {
        this.dataExporter = dataExporter;
    }

    @Override
    public void processData() {
        this.dataExporter.processData();
    }
}
