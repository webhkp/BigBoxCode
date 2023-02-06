// StorageStrategy.java

package com.bigboxcode.designpattern.strategy.filestorage;

public class StorageStrategy {
    private Storage storage;

    public StorageStrategy(Storage storage) {
        this.storage = storage;
    }

    public int uploadFile(String tempPath) {
        int fileId = this.storage.storeFile(tempPath);
        this.storage.printFileInfo(fileId);

        return fileId;
    }

    public String getFileUrl(int fileId) {
        return this.storage.retrieveFile(fileId);
    }
}
