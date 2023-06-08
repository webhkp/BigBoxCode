// file_op.go

package main

import "fmt"

type FileOp struct {
}

func NewFileOp() (fileOp *FileOp) {
	fileOp = &FileOp{}
	return
}

func (fileOp *FileOp) ReadFile() (string) {
	// Code to read from file

	fmt.Println("Reading from file")
	return "some dummy response read from file"
}

func (fileOp *FileOp) WriteFile(input string) {
	// Write to file related code here

	fmt.Printf("Writing to file: %v\n", input)
}