// demo.ts

import GoogleDriveStorage from "./google-drive-storage";
import LocalStorage from "./local-storage";
import S3Storage from "./s3-storage";
import StorageStrategy from "./storage-strategy";


// Use Local storage
console.log("Using local storage:");

let fileStorage = new StorageStrategy(new LocalStorage());
fileStorage.uploadFile("/some-temp-path");

// Use car
console.log("\n\nUsing AWS S3:");

fileStorage = new StorageStrategy(new S3Storage());
fileStorage.uploadFile("/some-temp-path");

// Use plane
console.log("\n\nUsing Google Drive:");

fileStorage = new StorageStrategy(new GoogleDriveStorage());
fileStorage.uploadFile("/some-temp-path");
