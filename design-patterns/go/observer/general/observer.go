// observer.go

package main

type IObserver interface {
	SendUpdate()
}

type Observer struct {
	subject Subject
}
