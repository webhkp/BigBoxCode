// background_decorator.go

package main

import "fmt"

type BackgroundDecorator struct {
	*UIDecorator
}

func NewBackgroundDecorator(uiElement UIElement) (backgroundDecorator *BackgroundDecorator) {
	backgroundDecorator = &BackgroundDecorator{}
	backgroundDecorator.UIDecorator = NewUIDecorator(uiElement)
	return
}

func (backgroundDecorator *BackgroundDecorator) Draw() {
	// Can perform any additional task anywhere in the method

	backgroundDecorator.UIDecorator.Draw()

	// Write code to add background to the element
	fmt.Println("Adding Background to the element")
}