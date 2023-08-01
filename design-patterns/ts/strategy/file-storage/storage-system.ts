// storage-system.ts

interface StorageSystem {
    storeFile(tempPath: string): number;
    retrieveFile(fileId: number): string;
    printFileInfo(fileId: number): void;
}

export default StorageSystem;