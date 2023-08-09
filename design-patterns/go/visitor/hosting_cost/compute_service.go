// compute_service.go

package main

type ComputeService struct {
	price    float64
	quantity int
}

func NewComputeService(quantity int) (compute *ComputeService) {
	compute = &ComputeService{}
	compute.price = 10.50
	compute.quantity = quantity
	return
}

func (compute *ComputeService) GetPrice() float64 {
	return compute.price
}

func (compute *ComputeService) GetQuantity() int {
	return compute.quantity
}

func (compute *ComputeService) Accept(hostingCalculatorVisitor HostingCalculatorVisitor) float64 {
	return hostingCalculatorVisitor.ComputeVisit(compute)
}
