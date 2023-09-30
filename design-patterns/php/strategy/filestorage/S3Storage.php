<?php
// S3Storage.php

namespace BigBoxCode\DesignPattern\Strategy\FileStorage;

class S3Storage implements StorageSystem {

    public function storeFile(string $tempPath): int {
        // Code to store file here

        // return the ID that is obtained from the database record or any other unique identifier.

        // For demo purpose a random number is returned here
        return rand(10_000, 99_999);
    }

    public function retrieveFile(int $fileId): string {
        // Retrieve the url and return back

        // Some dummy url is returned for demo purpose
        return "https://bigboxcode.s3.amazonaws.com/pdf/" . $fileId . "/UC-0e7654338-5697-4f99-b33-d89h87g5gf4gwfg.pdf";
    }

    public function printFileInfo(int $fileId): void {
        echo "Storage type: AWS S3\n";
        echo "File ID: " . $fileId . "\n";
        echo "File URL: " . $this->retrieveFile($fileId) . "\n";
    }
}