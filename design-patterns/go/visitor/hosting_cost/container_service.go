// container_servie.go

package main

type ContainerService struct {
	price    float64
	quantity int
}

func NewContainerService(quantity int) (containerService *ContainerService) {
	containerService = &ContainerService{}
	containerService.price = 5.60
	containerService.quantity = quantity
	return
}

func (containerService *ContainerService) GetPrice() float64 {
	return containerService.price
}

func (containerService *ContainerService) GetQuantity() int {
	return containerService.quantity
}

func (containerService *ContainerService) Accept(hostingCalculatorVisitor HostingCalculatorVisitor) float64 {
	return hostingCalculatorVisitor.ContainerVisit(containerService)
}
