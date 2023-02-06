package com.bigboxcode.designpattern.strategy.filestorage;

public class Demo {
    public static void main(String[] args) {
        // Use Local storage
        System.out.println("Using local storage:");

        StorageStrategy fileStorage = new StorageStrategy(new LocalStorage());
        fileStorage.uploadFile("/some-temp-path");

        // Use car
        System.out.println("\n\nUsing AWS S3:");

        fileStorage = new StorageStrategy(new S3Storage());
        fileStorage.uploadFile("/some-temp-path");

        // Use plane
        System.out.println("\n\nUsing Google Drive:");

        fileStorage = new StorageStrategy(new GoogleDriveStorage());
        fileStorage.uploadFile("/some-temp-path");

    }
}
