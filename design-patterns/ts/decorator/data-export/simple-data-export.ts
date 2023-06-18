// simple-data-export.ts

import DataExport from "./data-export";


class SimpleDataExport implements DataExport {
    processData(): void {
        console.log("Processing Data");
    }
}

export default SimpleDataExport;