// json-data-export-decorator.ts

import DataExport from "./data-export";
import DataExportDecorator from "./data-export-decorator";


class JsonDataExportDecorator extends DataExportDecorator {
    constructor(dataExporter: DataExport) {
        super(dataExporter);
    }

    processData(): void {
        this.dataExporter.processData();
        this.processJson();
    }

    processJson(): void {
        console.log("Processed data to JSON");
    }
}

export default JsonDataExportDecorator;