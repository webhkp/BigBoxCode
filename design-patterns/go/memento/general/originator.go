// originator.go

package main

import "fmt"

type Originator struct {
	state string
}

func NewOriginator() (originator *Originator) {
	originator = &Originator{}
	return
}

func (originator *Originator) GetMementoState(memento *Memento) {
	originator.state = memento.GetState()
}

func (originator *Originator) GetState() (string) {
	return originator.state
}

func (originator *Originator) SetMemento() (*Memento) {
	fmt.Printf("Memento Saved with timestamp => %s\n", originator.state)
	return NewMemento(originator.state)
}

func (originator *Originator) SetState(state string) {
	originator.state = state
}