// colleague.go

package main

type IColleague interface {
	ReceiveMessage(message string)
	SendMessage(colleague IColleague, message string)
}

type Colleague struct {
	mediator *Mediator
}

func NewColleague(mediator *Mediator) (colleague *Colleague) {
	colleague = &Colleague{}
	colleague.mediator = mediator
	return
}
