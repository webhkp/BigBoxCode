// memento.go

package main

type Memento struct {
	state string
}

func NewMemento(state string) (memento *Memento) {
	memento = &Memento{}
	memento.state = state
	return
}

func (memento *Memento) GetState() string {
	return memento.state
}
