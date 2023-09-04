<?php
// JsonDataExportDecorator.php

namespace BigBoxCode\DesignPattern\Decorator\DataExport;

class JsonDataExportDecorator extends DataExportDecorator {
    public function __construct(DataExport $dataExporter) {
        parent::__construct($dataExporter);
    }

    public function processData(): void {
        $this->dataExporter->processData();
        $this->processJson();
    }

    public function processJson(): void {
        echo "Processed data to JSON\n";
    }
}