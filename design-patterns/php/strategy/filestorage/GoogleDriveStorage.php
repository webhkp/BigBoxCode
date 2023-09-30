<?php
// GoogleDriveStorage.php

namespace BigBoxCode\DesignPattern\Strategy\FileStorage;

class GoogleDriveStorage implements StorageSystem {

    public function storeFile(string $tempPath): int {
        // Code to store file here

        // return the ID that is obtained from the database record or any other unique identifier.

        // For demo purpose a random number is returned here
        return rand(1_000, 9_999);
    }


    public function retrieveFile(int $fileId): string {
        // Retrieve the url and return back

        // Some dummy url is returned for demo purpose
        return "https://drive.google.com/file/d/1234_9K7654hu6RT_9j7JKY3fK/view/bigboxcode/" . $fileId;
    }

    public function printFileInfo(int $fileId): void {
        echo "Storage type: Google Drive\n";
        echo "File ID: " . $fileId . "\n";
        echo "File URL: " . $this->retrieveFile($fileId) . "\n";
    }
}