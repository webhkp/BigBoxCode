<?php
// ExcelDataExportDecorator.php

namespace BigBoxCode\DesignPattern\Decorator\DataExport;

class ExcelDataExportDecorator extends DataExportDecorator {
    public function __construct(DataExport $dataExporter) {
        parent::__construct($dataExporter);
    }

    public function processData(): void {
        $this->dataExporter->processData();
        $this->processExcel();
    }

    public function processExcel() {
        echo "Processed data to Excel\n";
    }
}