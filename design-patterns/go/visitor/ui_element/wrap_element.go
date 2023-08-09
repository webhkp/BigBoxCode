// wrap_element.go

package main

type WrapElement struct {
	text    string
	wrapper string
}

func NewWrapElement(text string, wrapper string) (wrapElement *WrapElement) {
	wrapElement = &WrapElement{}
	wrapElement.text = text
	wrapElement.wrapper = wrapper
	return
}

func (wrapElement *WrapElement) GetText() string {
	return wrapElement.text
}

func (wrapElement *WrapElement) GetWrapper() string {
	return wrapElement.wrapper
}

func (wrapElement *WrapElement) AppendElement(visitor Visitor) {
	visitor.AppendContentWithWrapper(wrapElement)
}
