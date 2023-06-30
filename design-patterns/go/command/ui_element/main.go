// main.go

package main

func main() {
	uiControl := NewUiControl()
	inputUi := NewInputUi()
	tableUi := NewTableUi()
	buttonUi := NewButtonUi("Submit")

	uiControl.AddElement(inputUi)
	uiControl.AddElement(tableUi)
	uiControl.AddElement(buttonUi)

	uiControl.RemoveElement(tableUi)

	uiControl.AddElement(NewButtonUi("Cancel"))
	uiControl.AddElement(NewTableUi())
	uiControl.AddElement(NewInputUi())
	uiControl.AddElement(NewButtonUi("Wrong button"))

	uiControl.Undo()
	uiControl.Undo()
}
