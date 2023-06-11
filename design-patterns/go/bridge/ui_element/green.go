// green.go

package main

import "fmt"

type Green struct {
}

func NewGreen() (green *Green) {
	green = &Green{}
	return
}

func (green *Green) SetColor() {
	fmt.Println("Setting proper color for Green color schema")
}
