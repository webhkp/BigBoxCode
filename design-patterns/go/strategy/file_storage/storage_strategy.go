// storage_strategy.go

package main

type StorageStrategy struct {
	storage Storage
}

func NewStorageStrategy(storage Storage) (storageStrategy *StorageStrategy) {
	storageStrategy = &StorageStrategy{}
	storageStrategy.storage = storage
	return
}

func (storageStrategy *StorageStrategy) GetFileUrl(fileId int) string {
	return storageStrategy.storage.RetrieveFile(fileId)
}

func (storageStrategy *StorageStrategy) UploadFile(tempPath string) int {
	fileId := storageStrategy.storage.StoreFile(tempPath)
	storageStrategy.storage.PrintFileInfo(fileId)
	return fileId
}
