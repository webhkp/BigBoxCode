// serverless_service.go

package main

type ServerlessService struct {
	hourlyPrice float64
	totalHours  int
}

func NewServerlessService(totalHours int) (serverlessService *ServerlessService) {
	serverlessService = &ServerlessService{}
	serverlessService.hourlyPrice = 0.32
	serverlessService.totalHours = totalHours
	return
}

func (serverlessService *ServerlessService) GetHourlyPrice() float64 {
	return serverlessService.hourlyPrice
}

func (serverlessService *ServerlessService) GetTotalHours() int {
	return serverlessService.totalHours
}

func (serverlessService *ServerlessService) Accept(hostingCalculatorVisitor HostingCalculatorVisitor) float64 {
	return hostingCalculatorVisitor.ServerlessVisit(serverlessService)
}
