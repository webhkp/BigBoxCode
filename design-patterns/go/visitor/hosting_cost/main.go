// main.go

package main

import "fmt"

func main() {
	usedServices := []Service{
		NewComputeService(3),
		NewDatabaseService2(3, true),
		NewFileStorageService(120),
		NewServerlessService(720),
		NewContainerService(2),
	}
	totalCost := calculateHostingCost(usedServices)

	fmt.Printf("Total cost of hosting is: %f", totalCost)
}

func calculateHostingCost(services []Service) float64 {
	hostingCalculatorVisitorImpl := NewHostingCalculatorVisitorImpl()
	totalCost := 0.00

	for _, service := range services {
		totalCost += service.Accept(hostingCalculatorVisitorImpl)
	}
	return totalCost
}
