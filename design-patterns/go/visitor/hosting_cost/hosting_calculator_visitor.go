// hosting_calculator_visitor.go

package main

type HostingCalculatorVisitor interface {
	ComputeVisit(computeService *ComputeService) float64
	ContainerVisit(containerService *ContainerService) float64
	DatabaseVisit(databaseService *DatabaseService) float64
	FileVisit(fileStorageService *FileStorageService) float64
	ServerlessVisit(serverlessService *ServerlessService) float64
}
