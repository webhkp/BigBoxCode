// csv-data-export-decorator.ts

import DataExport from "./data-export";
import DataExportDecorator from "./data-export-decorator";

class CsvDataExportDecorator extends DataExportDecorator {
    constructor(dataExporter: DataExport) {
        super(dataExporter);
    }

    processData(): void {
        this.dataExporter.processData();
        this.processCsv();
    }

    processCsv(): void {
        console.log("Processed data to CSV");
    }
}

export default CsvDataExportDecorator;