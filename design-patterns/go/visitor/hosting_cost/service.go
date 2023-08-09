// service.go

package main

type Service interface {
	Accept(hostingCalculatorVisitor HostingCalculatorVisitor) float64
}
