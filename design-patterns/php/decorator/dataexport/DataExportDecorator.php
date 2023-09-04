<?php
// DataExportDecorator.php

namespace BigBoxCode\DesignPattern\Decorator\DataExport;


class DataExportDecorator implements DataExport {
    public function __construct(protected DataExport $dataExporter) {
    }

    public function processData(): void {
        $this->dataExporter->processData();
    }
}