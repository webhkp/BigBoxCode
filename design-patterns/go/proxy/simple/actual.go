// actual.go

package main

import "fmt"

type Actual struct {}

func NewActual() (actual *Actual) {
	actual = &Actual{}
	return
}
func (actual *Actual) Operation1() {
	fmt.Println("Performing operation 1 in the Actual Object")
}

func (actual *Actual) Operation2() {
	fmt.Println("Performing operation 2 in the Actual Object")
}