// main.go

package main

import "fmt"

func main() {
	// set the list of elements we want print
	uiElements := []UIElement{
		NewHeadElement("My Heading"),
		NewTextElement("First line of text"),
		NewListElement([]string{"abc", "def", "ghi", "jkl"}),
		NewWrapElement("Content wrapped with div", "div"),
		NewTextElement("Last line of text"),
	}

	visitor := NewElementVisitor()

	for _, element := range uiElements {
		element.AppendElement(visitor)
	}

	// let"s check the output
	fmt.Println(visitor.output)
}
