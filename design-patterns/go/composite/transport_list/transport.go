// transport.go

package main

type Transport interface {
	Start()
	
	Stop()

	Operate()

}
