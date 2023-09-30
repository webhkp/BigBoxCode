<?php
// StorageStrategy.php

namespace BigBoxCode\DesignPattern\Strategy\FileStorage;

class StorageStrategy {
    public function __construct(private StorageSystem $storageSystem) {
    }

    public function setStrategy(StorageSystem $storageSystem) {
        $this->storageSystem = $storageSystem;
    }

    public function uploadFile(string $tempPath): int {
        $fileId = $this->storageSystem->storeFile($tempPath);
        $this->storageSystem->printFileInfo($fileId);

        return $fileId;
    }

    public function getFileUrl(int $fileId): string {
        return $this->storageSystem->retrieveFile($fileId);
    }
}