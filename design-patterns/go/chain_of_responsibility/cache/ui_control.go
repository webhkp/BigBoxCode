// ui_control.go

package main

type UiControl struct {
	commandList []UiCommand
}

func NewUiControl() (uiControl *UiControl) {
	uiControl = &UiControl{}
	// uiControl.commandList = make([]UiCommand)
	return
}

func (uiControl *UiControl) AddElement(uiCommand UiCommand) {
	// Execute command
	uiCommand.Print()

	// Add to list
	uiControl.commandList = append(uiControl.commandList, uiCommand)
}

func (uiControl *UiControl) RemoveElement(uiCommand UiCommand) {
	// Remove element
	uiCommand.Remove()

	// Remove from list
	newList := []UiCommand{}

	for _, elem := range uiControl.commandList {
		if elem != uiCommand {
			newList = append(newList, elem)
		}
	}

	uiControl.commandList = newList
}

func (uiControl *UiControl) Undo() {
	uiCommand := uiControl.commandList[len(uiControl.commandList) - 1]
	uiControl.RemoveElement(uiCommand)
}
