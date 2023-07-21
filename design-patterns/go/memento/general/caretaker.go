// caretaker.go

package main

type Caretaker struct {
	mementoList []Memento
}

func NewCaretaker() (caretaker *Caretaker) {
	caretaker = &Caretaker{}
	return
}

func (caretaker *Caretaker) Add(memento Memento) {
	caretaker.mementoList = append(caretaker.mementoList, memento)
}

func (caretaker *Caretaker) GetByIndex(index int) Memento {
	return caretaker.mementoList[index]
}

func (caretaker *Caretaker) GetCurrent() Memento {
	return caretaker.mementoList[len(caretaker.mementoList)-1]
}

func (caretaker *Caretaker) Undo() {
	caretaker.mementoList = caretaker.mementoList[:len(caretaker.mementoList)-1]
}
