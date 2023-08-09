// list_element.go

package main

type ListElement struct {
	lines []string
}

func NewListElement(lines []string) (listElement *ListElement) {
	listElement = &ListElement{}
	listElement.lines = lines
	return
}

func (listElement *ListElement) GetListItems() []string {
	return listElement.lines
}

func (listElement *ListElement) AppendElement(visitor Visitor) {
	visitor.AppendList(listElement)
}
