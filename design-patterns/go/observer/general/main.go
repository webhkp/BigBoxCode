// main.go

package main

import "fmt"

func main() {
	subject := NewConcreteSubject()

	NewObserverOne(subject)
	NewObserverTwo(subject)
	fmt.Println("Setting subject value to 10")
	subject.SetState(10)

	fmt.Println("Setting subject value to 999")
	subject.SetState(999)
}
