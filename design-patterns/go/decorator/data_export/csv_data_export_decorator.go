// csv_data_export_decorator.go

package main

import "fmt"

type CsvDataExportDecorator struct {
	*DataExportDecorator
}

func NewCsvDataExportDecorator(dataExporter DataExport) (csvDataExportDecorator *CsvDataExportDecorator) {
	csvDataExportDecorator = &CsvDataExportDecorator{}
	csvDataExportDecorator.DataExportDecorator = NewDataExportDecorator(dataExporter)
	return
}

func (csvDataExportDecorator *CsvDataExportDecorator) processCsv() {
	fmt.Println("Processed data to CSV")
}

func (csvDataExportDecorator *CsvDataExportDecorator) ProcessData() {
	csvDataExportDecorator.DataExportDecorator.ProcessData()
	csvDataExportDecorator.processCsv()
}
