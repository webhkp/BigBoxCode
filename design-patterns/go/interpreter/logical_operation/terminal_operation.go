// terminal_operation.go

package main

import "strings"

type TerminalOperation struct {
	data string
}

func NewTerminalOperation(data string) (terminalOperation *TerminalOperation) {
	terminalOperation = &TerminalOperation{}
	terminalOperation.data = data
	return
}

func (terminalOperation *TerminalOperation) Execute(opContext string) bool {
	return strings.Contains(opContext, terminalOperation.data)
}
