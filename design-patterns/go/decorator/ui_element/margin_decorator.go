// margin_decorator.go

package main

import "fmt"

type MarginDecorator struct {
	*UIDecorator
}

func NewMarginDecorator(uiElement UIElement) (marginDecorator *MarginDecorator) {
	marginDecorator = &MarginDecorator{}
	marginDecorator.UIDecorator = NewUIDecorator(uiElement)
	return
}

func (marginDecorator *MarginDecorator) Draw() {
	// Can perform any additional task anywhere in the method

	marginDecorator.UIDecorator.Draw()

	// Write code to add margin to the element
	fmt.Println("Adding margin to the element")
}