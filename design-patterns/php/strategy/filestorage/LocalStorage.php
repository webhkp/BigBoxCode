<?php
// LocalStorage.php

namespace BigBoxCode\DesignPattern\Strategy\FileStorage;


class LocalStorage implements StorageSystem {

    public function storeFile(string $tempPath): int {
        // Code to store file here

        // return the ID that is obtained from the database record or any other unique identifier.

        // For demo purpose a random number is returned here
        return rand(100, 999);
    }

    public function retrieveFile(int $fileId): string {
        // Retrieve the url and return back

        // Some dummy url is returned for demo purpose
        return "https://bigboxcode.com/files/local/" . $fileId;
    }

    public function printFileInfo(int $fileId): void {
        echo "Storage type: Local Storage\n";
        echo "File ID: " . $fileId . "\n";
        echo "File URL: " . $this->retrieveFile($fileId) . "\n";
    }
}