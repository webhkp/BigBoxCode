// data_export_decorator.go

package main

type DataExportDecorator struct {
	dataExport DataExport
}

func NewDataExportDecorator(dataExport DataExport) (dataExportDecorator *DataExportDecorator) {
	dataExportDecorator = &DataExportDecorator{}
	dataExportDecorator.dataExport = dataExport
	return
}

func (dataExportDecorator *DataExportDecorator) ProcessData() {
	dataExportDecorator.dataExport.ProcessData()
}