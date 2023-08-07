// s3_storage.go

package main

import (
	"fmt"
	"math/rand"
)

type S3Storage struct {
}

func NewS3Storage() (s3Storage *S3Storage) {
	s3Storage = &S3Storage{}
	return
}

func (s3Storage *S3Storage) PrintFileInfo(fileId int) {
	fmt.Println("Storage type: AWS S3")
	fmt.Printf("File ID: %d\n", fileId)
	fmt.Printf("File URL: %s\n", s3Storage.RetrieveFile(fileId))
}

func (s3Storage *S3Storage) RetrieveFile(fileId int) string {
	// Retrieve the url and return back

	// Some dummy url is returned for demo purpose
	return "https://bigboxcode.s3.amazonaws.com/pdf/UC-0e7654338-5697-4f99-b33-d89h87g5gf4gwfg.pdf"
}

func (s3Storage *S3Storage) StoreFile(tempPath string) int {
	// Code to store file here

	// return the ID that is obtained from the database record or any other unique identifier.

	// For demo purpose a random number is returned here
	return rand.Intn(10000)
}
