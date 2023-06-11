// blue.go

package main

import "fmt"

type Blue struct {
}

func NewBlue() (blue *Blue) {
	blue = &Blue{}
	return
}

func (blue *Blue) SetColor() {
	fmt.Println("Setting proper color for Blue color schema")
}
