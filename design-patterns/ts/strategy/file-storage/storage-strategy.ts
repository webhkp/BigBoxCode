// storage-strategy.ts

import StorageSystem from "./storage-system";

class StorageStrategy {
    private storage: StorageSystem;

    constructor(storage: StorageSystem) {
        this.storage = storage;
    }

    uploadFile(tempPath: string): number {
        const fileId = this.storage.storeFile(tempPath);
        this.storage.printFileInfo(fileId);

        return fileId;
    }

    getFileUrl(fileId: number): string {
        return this.storage.retrieveFile(fileId);
    }
}

export default StorageStrategy;