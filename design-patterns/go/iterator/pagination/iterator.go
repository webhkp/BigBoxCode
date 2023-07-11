// iterator.go

package main

type Iterator struct {
	currentPosition int
	pages           []Page
}

func NewIterator(pages []Page) (iterator *Iterator) {
	iterator = &Iterator{}
	iterator.currentPosition = 0
	iterator.pages = pages
	return
}

func (iterator *Iterator) HasNext() bool {
	return iterator.currentPosition < len(iterator.pages)
}

func (iterator *Iterator) Next() Page {
	page := iterator.pages[iterator.currentPosition]
	iterator.currentPosition++
	return page
}
