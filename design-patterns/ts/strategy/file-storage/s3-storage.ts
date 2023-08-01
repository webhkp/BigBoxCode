// s3-storage.ts

import StorageSystem from "./storage-system";

class S3Storage implements StorageSystem {

    storeFile(tempPath: string): number {
        // Code to store file here

        // return the ID that is obtained from the database record or any other unique identifier.

        // For demo purpose a random number is returned here
        return Math.floor(Math.random() * 10000);
    }

    retrieveFile(fileId: number): string {
        // Retrieve the url and return back

        // Some dummy url is returned for demo purpose
        return "https://bigboxcode.s3.amazonaws.com/pdf/UC-0e7654338-5697-4f99-b33-d89h87g5gf4gwfg.pdf";
    }

    printFileInfo(fileId: number): void {
        console.log("Storage type: AWS S3");
        console.log("File ID: " + fileId);
        console.log("File URL: " + this.retrieveFile(fileId));
    }
}

export default S3Storage;