// visitor.go

package main

type Visitor interface {
	AppendContent(textElement *TextElement)
	AppendContentWithWrapper(wrapElement IWrapperElement)
	AppendList(listElement *ListElement)
}
