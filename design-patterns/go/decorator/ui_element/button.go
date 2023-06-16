// button.go

package main

import "fmt"

type Button struct {
}

func NewButton() (button *Button) {
	button = &Button{}
	return
}

func (button *Button) Draw() {
	fmt.Println("Drawing Button")
}
