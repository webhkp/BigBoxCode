// observer_two.go

package main

import "fmt"

type ObserverTwo struct {
	Observer
}

func NewObserverTwo(subject Subject) (observerTwo *ObserverTwo) {
	observerTwo = &ObserverTwo{}
	observerTwo.subject = subject
	observerTwo.subject.Attach(observerTwo)
	return
}

func (observerTwo *ObserverTwo) SendUpdate() {
	fmt.Printf("Received in ObserverTwo: %v\n", observerTwo.subject.GetState())
}
