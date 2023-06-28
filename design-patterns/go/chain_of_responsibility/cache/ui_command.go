// ui_command.go

package main

type UiCommand interface {
	Print()
	Remove()
}