// file_storage_service.go

package main

type FileStorageService struct {
	pricePerGB float64
	quantity   int
}

func NewFileStorageService(quantity int) (fileStorageService *FileStorageService) {
	fileStorageService = &FileStorageService{}
	fileStorageService.pricePerGB = 1.70
	fileStorageService.quantity = quantity
	return
}

func (fileStorageService *FileStorageService) GetPricePerGB() float64 {
	return fileStorageService.pricePerGB
}

func (fileStorageService *FileStorageService) GetQuantity() int {
	return fileStorageService.quantity
}

func (fileStorageService *FileStorageService) Accept(hostingCalculatorVisitor HostingCalculatorVisitor) float64 {
	return hostingCalculatorVisitor.FileVisit(fileStorageService)
}
