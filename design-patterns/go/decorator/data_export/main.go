// main.go

package main

func main() {
	csvDataExport := NewCsvDataExportDecorator(NewSimpleDataExport())
	csvDataExport.ProcessData()

	excelDataExport := NewExcelDataExportDecorator(NewSimpleDataExport())
	excelDataExport.ProcessData()

	jsonDataExport := NewJsonDataExportDecorator(NewSimpleDataExport())
	jsonDataExport.ProcessData()
}
