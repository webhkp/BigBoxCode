// ui_element.go

package main

type UIElement interface {
	AppendElement(vistor Visitor)
}

type IWrapperElement interface {
	GetText() string
	GetWrapper() string
}
