// concrete_subject.go

package main

type ConcreteSubject struct {
	state        int
	observerList []IObserver
}

func NewConcreteSubject() (concreteSubject *ConcreteSubject) {
	concreteSubject = &ConcreteSubject{}
	return
}

func (concreteSubject *ConcreteSubject) Attach(observer IObserver) {
	concreteSubject.observerList = append(concreteSubject.observerList, observer)
}

func (concreteSubject *ConcreteSubject) GetState() int {
	return concreteSubject.state
}

func (concreteSubject *ConcreteSubject) NotifyObservers() {
	for _, observer := range concreteSubject.observerList {
		observer.SendUpdate()
	}
}

func (concreteSubject *ConcreteSubject) SetState(state int) {
	concreteSubject.state = state
	concreteSubject.NotifyObservers()
}
