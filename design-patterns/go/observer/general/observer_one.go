// observer_one.go

package main

import "fmt"

type ObserverOne struct {
	Observer
}

func NewObserverOne(subject Subject) (observerOne *ObserverOne) {
	observerOne = &ObserverOne{}
	observerOne.subject = subject
	observerOne.subject.Attach(observerOne)
	return
}

func (observerOne *ObserverOne) SendUpdate() {
	fmt.Printf("Received in ObserverOne: %v\n", observerOne.subject.GetState())
}
