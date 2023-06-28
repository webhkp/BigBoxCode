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

func (uiControl *UiControl) addElement(uiCommand UiCommand) {
	// Execute command
	uiCommand.Print()

	// Add to list
	uiControl.commandList = append(uiControl.commandList, uiCommand)
}

func (uiControl *UiControl) removeElement(uiCommand UiCommand) {
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

func (uiControl *UiControl) undo() {
	uiCommand := uiControl.commandList[len(uiControl.commandList) - 1]
	uiControl.removeElement(uiCommand)
}
