// main.go

package main

func main() {
	tableWithBorder := NewBorderDecorator(NewTable())
	tableWithBorder.Draw()

	inputWithBorderAndBackground := NewBackgroundDecorator(NewBorderDecorator(NewInputBox()))
	inputWithBorderAndBackground.Draw()

	buttonWithAllDecorator := NewMarginDecorator(NewBackgroundDecorator(NewBorderDecorator(NewButton())))
	buttonWithAllDecorator.Draw()
}