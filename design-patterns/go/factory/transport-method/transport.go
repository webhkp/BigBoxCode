// transport.go

package main

type Transport interface {
	Repair()
	Start()
	Stop()
}
