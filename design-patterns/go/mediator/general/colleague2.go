// colleague2.go

package main

import "fmt"


type Colleague2 struct {
	*Colleague
}

func NewColleague2(mediator *Mediator) (colleague2 *Colleague2) {
	colleague2 = &Colleague2{}
	colleague2.Colleague = NewColleague(mediator)
	return
}

func (colleague2 *Colleague2) ReceiveMessage(msg string) {
	fmt.Printf("Message received in Colleague2: %s\n",  msg)
}

func (colleague2 *Colleague2) SendMessage(colleague IColleague, msg string) {
	colleague2.mediator.SendMessage(colleague, msg)
}