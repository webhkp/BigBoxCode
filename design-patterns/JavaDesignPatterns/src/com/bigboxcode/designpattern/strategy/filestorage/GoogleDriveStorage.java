// GoogleDriveStorage.java

package com.bigboxcode.designpattern.strategy.filestorage;

import com.bigboxcode.Storage;

import java.util.Random;

public class GoogleDriveStorage implements Storage {
    @Override
    public int storeFile(String tempPath) {
        // Code to store file here

        // return the ID that is obtained from the database record or any other unique identifier.

        // For demo purpose a random number is returned here
        return (new Random()).nextInt(1000);
    }

    @Override
    public String retrieveFile(int fileId) {
        // Retrieve the url and return back

        // Some dummy url is returned for demo purpose
        return "https://drive.google.com/file/d/1234_9K7654hu6RT_9j7JKY3fK/view";
    }
    @Override
    public void printFileInfo(int fileId) {
        System.out.println("Storage type: Google Drive");
        System.out.println("File ID: " + fileId);
        System.out.println("File URL: " + this.retrieveFile(fileId));
    }
}
