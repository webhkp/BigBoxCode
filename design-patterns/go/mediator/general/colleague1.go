// colleague1.go

package main

import "fmt"


type Colleague1 struct {
	*Colleague
}

func NewColleague1(mediator *Mediator) (colleague1 *Colleague1) {
	colleague1 = &Colleague1{}
	colleague1.Colleague = NewColleague(mediator)
	return
}

func (colleague1 *Colleague1) ReceiveMessage(msg string) {
	fmt.Printf("Message received in Colleague1: %s\n",  msg)
}

func (colleague1 *Colleague1) SendMessage(colleague IColleague, msg string) {
	colleague1.mediator.SendMessage(colleague, msg)
}