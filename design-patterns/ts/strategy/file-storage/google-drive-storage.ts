// google-drive-storage.ts

import StorageSystem from "./storage-system";


class GoogleDriveStorage implements StorageSystem {

    storeFile(tempPath: string): number {
        // Code to store file here

        // return the ID that is obtained from the database record or any other unique identifier.

        // For demo purpose a random number is returned here
        return Math.floor(Math.random() * 1000);
    }


    retrieveFile(fileId: number): string {
        // Retrieve the url and return back

        // Some dummy url is returned for demo purpose
        return "https://drive.google.com/file/d/1234_9K7654hu6RT_9j7JKY3fK/view";
    }

    printFileInfo(fileId: number): void {
        console.log("Storage type: Google Drive");
        console.log("File ID: " + fileId);
        console.log("File URL: " + this.retrieveFile(fileId));
    }
}

export default GoogleDriveStorage;