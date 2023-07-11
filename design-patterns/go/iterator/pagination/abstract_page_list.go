// abstract_page_list.go

package main

type AbstractPageList interface {
	Add(page *Page)
	Iterator() *AbstractIterator
	Remove(page *Page)
}
