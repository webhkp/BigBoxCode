// element_visitor

package main

import "fmt"

type ElementVisitor struct {
	output string
}

func NewElementVisitor() (elementVsitor *ElementVisitor) {
	elementVsitor = &ElementVisitor{}
	return
}

func (elementVisitor *ElementVisitor) AppendContent(textElement *TextElement) {
	elementVisitor.output += textElement.text
}

func (elementVisitor *ElementVisitor) AppendContentWithWrapper(wrapElement IWrapperElement) {
	elementVisitor.output += fmt.Sprintf("[%s]%s[/%s]", wrapElement.GetWrapper(), wrapElement.GetText(), wrapElement.GetWrapper())
}

func (elementVisitor *ElementVisitor) AppendList(listElement *ListElement) {
	elementVisitor.output += "[ul]"

	for _, item := range listElement.GetListItems() {
		elementVisitor.output += fmt.Sprintf("[li]%s[/li]", item)
	}

	elementVisitor.output += "[/ul]"
}
