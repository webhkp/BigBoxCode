// main.go

package main

import (
	"fmt"
	"time"
)

func main() {
	caretaker := NewCaretaker()
	originator := NewOriginator()

	originator.SetState(fmt.Sprintf("Time - 1 : %v", time.Now()))
	caretaker.Add(*originator.SetMemento())

	originator.SetState(fmt.Sprintf("Time - 2 : %v", time.Now()))
	caretaker.Add(*originator.SetMemento())

	originator.SetState(fmt.Sprintf("Time - 3 : %v", time.Now()))
	caretaker.Add(*originator.SetMemento())

	fmt.Println("---------------------------------------------")
	fmt.Println("Check state at index 1 (index starts at 0):")
	stateAtIndex1 := caretaker.GetByIndex(1)
	fmt.Println(stateAtIndex1.GetState())

	fmt.Println("---------------------------------------------")
	
	fmt.Println("Check last state:")
	lastState := caretaker.GetCurrent()
	fmt.Println(lastState.GetState())

	fmt.Println("---------------------------------------------")
	
	fmt.Println("Undoing last state")
	caretaker.Undo()

	fmt.Println("---------------------------------------------")
	
	fmt.Println("Check last state after undo:")
	lastStateAfterUndo := caretaker.GetCurrent()
	fmt.Println(lastStateAfterUndo.GetState())
}
