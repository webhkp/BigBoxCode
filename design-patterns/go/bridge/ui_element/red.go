// red.go

package main

import "fmt"

type Red struct {
}

func NewRed() (red *Red) {
	red = &Red{}
	return
}

func (red *Red) SetColor() {
	fmt.Println("Setting proper color for Red color schema")
}
