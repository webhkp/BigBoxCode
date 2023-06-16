// excel_data_export_decorator.go

package main

import "fmt"

type ExcelDataExportDecorator struct {
	*DataExportDecorator
}

func NewExcelDataExportDecorator(dataExporter DataExport) (excelDataExportDecorator *ExcelDataExportDecorator) {
	excelDataExportDecorator = &ExcelDataExportDecorator{}
	excelDataExportDecorator.DataExportDecorator = NewDataExportDecorator(dataExporter)
	return
}

func (excelDataExportDecorator *ExcelDataExportDecorator) ProcessData() {
	excelDataExportDecorator.DataExportDecorator.ProcessData()
	excelDataExportDecorator.processExcel()
}

func (excelDataExportDecorator *ExcelDataExportDecorator) processExcel() {
	fmt.Println("Processed data to Excel")
}
