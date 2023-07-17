// colleague3.go

package main

import "fmt"

type Colleague3 struct {
	*Colleague
}

func NewColleague3(mediator *Mediator) (colleague3 *Colleague3) {
	colleague3 = &Colleague3{}
	colleague3.Colleague = NewColleague(mediator)
	return
}

func (colleague3 *Colleague3) ReceiveMessage(msg string) {
	fmt.Printf("Message received in Colleague3: %s\n",  msg)
}

func (colleague3 *Colleague3) SendMessage(colleague IColleague, msg string) {
	colleague3.mediator.SendMessage(colleague, msg)
}