// LocalStorage.java

package com.bigboxcode.designpattern.strategy.filestorage;

import com.bigboxcode.Storage;

import java.util.Random;

public class LocalStorage implements Storage {
    @Override
    public int storeFile(String tempPath) {
        // Code to store file here

        // return the ID that is obtained from the database record or any other unique identifier.

        // For demo purpose a random number is returned here
        return (new Random()).nextInt(100);
    }

    @Override
    public String retrieveFile(int fileId) {
        // Retrieve the url and return back

        // Some dummy url is returned for demo purpose
        return "https://bigboxcode.com/files/local/" + fileId;
    }

    @Override
    public void printFileInfo(int fileId) {
        System.out.println("Storage type: Local Storage");
        System.out.println("File ID: " + fileId);
        System.out.println("File URL: " + this.retrieveFile(fileId));
    }
}
