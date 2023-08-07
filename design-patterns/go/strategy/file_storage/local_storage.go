// local_storage.go

package main

import (
	"fmt"
	"math/rand"
)

type LocalStorage struct {
}

func NewLocalStorage() (localStorage *LocalStorage) {
	localStorage = &LocalStorage{}
	return
}

func (localStorage *LocalStorage) PrintFileInfo(fileId int) {
	fmt.Println("Storage type: Local Storage")
	fmt.Printf("File ID: %d\n", fileId)
	fmt.Printf("File URL: %s\n", localStorage.RetrieveFile(fileId))
}

func (localStorage *LocalStorage) RetrieveFile(fileId int) string {
	// Retrieve the url and return back

	// Some dummy url is returned for demo purpose
	return fmt.Sprintf("https://bigboxcode.com/files/local/%d", fileId)
}

func (localStorage *LocalStorage) StoreFile(tempPath string) int {
	// Code to store file here

	// return the ID that is obtained from the database record or any other unique identifier.

	// For demo purpose a random number is returned here
	return rand.Intn(100)
}
