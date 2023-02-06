// Storage.java

package com.bigboxcode.designpattern.strategy.filestorage;

public interface Storage {
    int storeFile(String tempPath);

    String retrieveFile(int fileId);

    void printFileInfo(int fileId);
}
