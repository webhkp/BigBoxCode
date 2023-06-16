// json_data_export_decorator.go

package main

import "fmt"

type JsonDataExportDecorator struct {
	*DataExportDecorator
}

func NewJsonDataExportDecorator(dataExporter DataExport) (jsonDataExportDecorator *JsonDataExportDecorator) {
	jsonDataExportDecorator = &JsonDataExportDecorator{}
	jsonDataExportDecorator.DataExportDecorator = NewDataExportDecorator(dataExporter)
	return
}

func (jsonDataExportDecorator *JsonDataExportDecorator) ProcessData() {
	jsonDataExportDecorator.DataExportDecorator.ProcessData()
	jsonDataExportDecorator.processJson()
}

func (jsonDataExportDecorator *JsonDataExportDecorator) processJson() {
	fmt.Println("Processed data to JSON")
}
