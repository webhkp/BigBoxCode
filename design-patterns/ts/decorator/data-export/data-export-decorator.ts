// data-export-decorator.ts

import DataExport from "./data-export";


class DataExportDecorator implements DataExport {
    protected dataExporter: DataExport;

    constructor(dataExporter: DataExport) {
        this.dataExporter = dataExporter;
    }

    public processData() {
        this.dataExporter.processData();
    }
}

export default DataExportDecorator;