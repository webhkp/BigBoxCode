// transport.go

package main

type Transport interface {
	GetInfo()
	Operate()
	Repair()
	Start()
	Stop()
}