// mediator.go

package main

type Mediator struct {
}

func NewMediator() (mediator *Mediator) {
	mediator = &Mediator{}
	return
}

func (mediator *Mediator) SendMessage(receiver IColleague, msg string) {
	receiver.ReceiveMessage(msg)
}