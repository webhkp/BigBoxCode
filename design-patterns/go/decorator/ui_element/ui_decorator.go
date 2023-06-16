// ui_decorator.go

package main

type UIDecorator struct {
	uiElement UIElement
}

func NewUIDecorator(uiElement UIElement) (uiDecorator *UIDecorator) {
	uiDecorator = &UIDecorator{}
	uiDecorator.uiElement = uiElement
	return
}

func (uiDecorator *UIDecorator) Draw() {
	uiDecorator.uiElement.Draw()
}