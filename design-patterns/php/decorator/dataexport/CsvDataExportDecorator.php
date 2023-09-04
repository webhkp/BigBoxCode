<?php
// CsvDataExportDecorator.php

namespace BigBoxCode\DesignPattern\Decorator\DataExport;

class CsvDataExportDecorator extends DataExportDecorator {
    public function __construct(DataExport $dataExporter) {
        parent::__construct($dataExporter);
    }

    public function processData(): void {
        $this->dataExporter->processData();
        $this->processCsv();
    }

    public function processCsv(): void {
        echo "Processed data to CSV\n";
    }
}