// head_element.go

package main

type HeadElement struct {
	wrapper string
	text    string
}

func NewHeadElement(text string) (headElement *HeadElement) {
	headElement = &HeadElement{}
	headElement.wrapper = "h1"
	headElement.text = text
	return
}

func (headElement *HeadElement) GetText() string {
	return headElement.text
}

func (headElement *HeadElement) GetWrapper() string {
	return headElement.wrapper
}

func (headElement *HeadElement) AppendElement(visitor Visitor) {
	visitor.AppendContentWithWrapper(headElement)
}
