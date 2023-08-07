// storage.go

package main

type Storage interface {
	PrintFileInfo(fileId int)
	RetrieveFile(fileId int) string
	StoreFile(tempPath string) int
}
