// database_service.go

package main

type DatabaseService struct {
	price         float64
	backPrice     float64
	quantity      int
	backupEnabled bool
}

func NewDatabaseService(quantity int) (databaseService *DatabaseService) {
	databaseService = &DatabaseService{}
	databaseService.price = 100.00
	databaseService.backPrice = 30.00
	databaseService.backupEnabled = false
	databaseService.quantity = quantity
	return
}

func NewDatabaseService2(quantity int, backupEnabled bool) (databaseService *DatabaseService) {
	databaseService = &DatabaseService{}
	databaseService.price = 100.00
	databaseService.backPrice = 30.00
	databaseService.quantity = quantity
	databaseService.backupEnabled = backupEnabled
	return
}

func (databaseService *DatabaseService) GetBackPrice() float64 {
	return databaseService.backPrice
}

func (databaseService *DatabaseService) GetPrice() float64 {
	return databaseService.price
}

func (databaseService *DatabaseService) GetQuantity() int {
	return databaseService.quantity
}

func (databaseService *DatabaseService) IsBackupEnabled() bool {
	return databaseService.backupEnabled
}

func (databaseService *DatabaseService) Accept(hostingCalculatorVisitor HostingCalculatorVisitor) float64 {
	return hostingCalculatorVisitor.DatabaseVisit(databaseService)
}
