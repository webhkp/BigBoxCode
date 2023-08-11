// train.go

package main

import "fmt"

type Train struct {
	*Transport
}

func NewTrain() (train *Train) {
	train = &Train{}
	train.Transport = NewTransport(train)
	return
}

func (train *Train) AddEngine() {
	fmt.Println("Adding Engine to Train")
}

func (train *Train) AddWheel() {
	fmt.Println("Adding Wheels to Train")
}

func (train *Train) AddWing() {
	// implementatiom not require for train
}

func (train *Train) CreateBody() {
	fmt.Println("Creating Train Body")
}
