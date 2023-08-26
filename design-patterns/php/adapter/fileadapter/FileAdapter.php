<?php
// FileAdapter.php

namespace BigBoxCode\DesignPattern\Adapter\FileAdapter;


class FileAdapter implements Api {
    public function __construct(private FileOp $fileOp) {
    }

    public function fetchData(): string {
        return $this->fileOp->readFile();
    }

    public function sendData(string $data): void {
        $this->fileOp->writeFile($data);
    }
}