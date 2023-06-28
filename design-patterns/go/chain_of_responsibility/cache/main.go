// main.go

package main

func main() {
	uiControl := NewUiControl()
	inputUi := NewInputUi()
	tableUi := NewTableUi()
	buttonUi := NewButtonUi("Submit")

	uiControl.addElement(inputUi)
	uiControl.addElement(tableUi)
	uiControl.addElement(buttonUi)

	uiControl.removeElement(tableUi)

	uiControl.addElement(NewButtonUi("Cancel"))
	uiControl.addElement(NewTableUi())
	uiControl.addElement(NewInputUi())
	uiControl.addElement(NewButtonUi("Wrong button"))
	
	uiControl.undo()
	uiControl.undo()
}
