<?php
// SimpleDataExport.php

namespace BigBoxCode\DesignPattern\Decorator\DataExport;

class SimpleDataExport implements DataExport {
    public function processData(): void {
        echo "Processing Data\n";
    }
}