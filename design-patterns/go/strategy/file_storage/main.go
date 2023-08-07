// main.go

package main

import "fmt"

func main() {
	 // Use Local storage
	fmt.Println("Using local storage:")
	
	fileStorage := NewStorageStrategy(NewLocalStorage())
	fileStorage.UploadFile("/some-temp-path")

	// Use car
	fmt.Println("\n\nUsing AWS S3:")

	fileStorage = NewStorageStrategy(NewS3Storage())
	fileStorage.UploadFile("/some-temp-path")

	// Use plane
	fmt.Println("\n\nUsing Google Drive:")

	fileStorage = NewStorageStrategy(NewGoogleDriveStorage())
	fileStorage.UploadFile("/some-temp-path")
}

