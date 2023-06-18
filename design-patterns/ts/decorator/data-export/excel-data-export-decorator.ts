// excel-data-export-decorator.ts

import DataExport from "./data-export";
import DataExportDecorator from "./data-export-decorator";

class ExcelDataExportDecorator extends DataExportDecorator {
    constructor(dataExporter: DataExport) {
        super(dataExporter);
    }

    processData(): void {
        this.dataExporter.processData();
        this.processExcel();
    }

    processExcel() {
        console.log("Processed data to Excel");
    }
}

export default ExcelDataExportDecorator;