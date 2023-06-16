// simple_data_export.go

package main

import "fmt"

type SimpleDataExport struct {
}

func NewSimpleDataExport() (simpleDataExport *SimpleDataExport) {
	simpleDataExport = &SimpleDataExport{}
	return
}

func (simpleDataExport *SimpleDataExport) ProcessData() {
	fmt.Println("SimpleDataExport: Processing Data")
}
