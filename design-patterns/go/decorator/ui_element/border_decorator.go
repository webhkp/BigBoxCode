// border_decorator.go

package main

import "fmt"

type BorderDecorator struct {
	*UIDecorator
}

func NewBorderDecorator(uiElement UIElement) (borderDecorator *BorderDecorator) {
	borderDecorator = &BorderDecorator{}
	borderDecorator.UIDecorator = NewUIDecorator(uiElement)
	return
}

func (borderDecorator *BorderDecorator) Draw() {
	// Can perform any additional task anywhere in the method

	borderDecorator.UIDecorator.Draw()

	// Write code to add border to the element
	fmt.Println("Adding Border to the element")
}