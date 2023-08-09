// hosting_calculator_visitor_impl.go

package main

type HostingCalculatorVisitorImpl struct{}

func NewHostingCalculatorVisitorImpl() (hcvi *HostingCalculatorVisitorImpl) {
	hcvi = &HostingCalculatorVisitorImpl{}
	return
}
func (hcvi *HostingCalculatorVisitorImpl) ComputeVisit(computeService *ComputeService) float64 {
	return computeService.GetPrice() * float64(computeService.GetQuantity())
}

func (hcvi *HostingCalculatorVisitorImpl) ContainerVisit(containerService *ContainerService) float64 {
	return containerService.GetPrice() * float64(containerService.GetQuantity())
}

func (hcvi *HostingCalculatorVisitorImpl) DatabaseVisit(databaseService *DatabaseService) float64 {
	serviceCost := databaseService.GetPrice() * float64(databaseService.GetQuantity())

	backupCost := 0.00
	if databaseService.IsBackupEnabled() {
		backupCost = databaseService.GetBackPrice() * float64(databaseService.GetQuantity())
	}
	return serviceCost + backupCost
}

func (hcvi *HostingCalculatorVisitorImpl) FileVisit(fileStorageService *FileStorageService) float64 {
	return fileStorageService.GetPricePerGB() * float64(fileStorageService.GetQuantity())
}

func (hcvi *HostingCalculatorVisitorImpl) ServerlessVisit(serverlessService *ServerlessService) float64 {
	return serverlessService.GetHourlyPrice() * serverlessService.GetHourlyPrice()
}
