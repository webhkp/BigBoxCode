// text_element.go

package main

type TextElement struct {
	text string
}

func NewTextElement(text string) (textElement *TextElement) {
	textElement = &TextElement{}
	textElement.text = text
	return
}

func (textElement *TextElement) GetText() string {
	return textElement.text
}

func (textElement *TextElement) AppendElement(visitor Visitor) {
	visitor.AppendContent(textElement)
}
