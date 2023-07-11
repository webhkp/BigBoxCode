// page.go

package main

import "fmt"

type Page struct {
	number int
	path   string
}

func NewPage() (page *Page) {
	page = &Page{}
	return
}
func (page *Page) GetNumber() int {
	return page.number
}
func (page *Page) GetPath() string {
	if page.path == "" {
		return fmt.Sprintf("/page/%v", page.number)
	}
	return page.path
}

func (page *Page) SetNumber(number int) {
	page.number = number
}

func (page *Page) SetPath(path string) {
	page.path = path
}
