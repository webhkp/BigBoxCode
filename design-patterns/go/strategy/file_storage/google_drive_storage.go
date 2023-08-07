// google_drive_storage.go

package main

import (
	"fmt"
	"math/rand"
)

type GoogleDriveStorage struct {
}

func NewGoogleDriveStorage() (googleDriveStorage *GoogleDriveStorage) {
	googleDriveStorage = &GoogleDriveStorage{}
	return
}

func (googleDriveStorage *GoogleDriveStorage) PrintFileInfo(fileId int) {
	fmt.Println("Storage type: Google Drive")
	fmt.Printf("File ID: %d\n", fileId)
	fmt.Printf("File URL: %s\n", googleDriveStorage.RetrieveFile(fileId))
}

func (googleDriveStorage *GoogleDriveStorage) RetrieveFile(fileId int) string {
	// Retrieve the url and return back

	// Some dummy url is returned for demo purpose
	return "https://drive.google.com/file/d/1234_9K7654hu6RT_9j7JKY3fK/view"
}

func (googleDriveStorage *GoogleDriveStorage) StoreFile(tempPath string) int {
	// Code to store file here

	// return the ID that is obtained from the database record or any other unique identifier.

	// For demo purpose a random number is returned here
	return rand.Intn(1000)
}
