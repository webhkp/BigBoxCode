// subject.go

package main

type Subject interface {
	Attach(observer IObserver)
	GetState() int
	NotifyObservers()
	SetState(state int)
}
