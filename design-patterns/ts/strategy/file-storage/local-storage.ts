// local-storage.ts

import StorageSystem from "./storage-system";

class LocalStorage implements StorageSystem {

    storeFile(tempPath: string): number {
        // Code to store file here

        // return the ID that is obtained from the database record or any other unique identifier.

        // For demo purpose a random number is returned here
        return Math.floor(Math.random() * 100);
    }

    retrieveFile(fileId: number): string {
        // Retrieve the url and return back

        // Some dummy url is returned for demo purpose
        return "https://bigboxcode.com/files/local/" + fileId;
    }

    printFileInfo(fileId: number): void {
        console.log("Storage type: Local Storage");
        console.log("File ID: " + fileId);
        console.log("File URL: " + this.retrieveFile(fileId));
    }
}

export default LocalStorage;