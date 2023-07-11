// page_list.go

package main

type PageList struct {
	pages []Page
}

func NewPageList() (pageList *PageList) {
	pageList = &PageList{}
	return
}

func (pageList *PageList) Add(page Page) {
	pageList.pages = append(pageList.pages, page)
}

func (pageList *PageList) Remove(page Page) {
	for i, pageElem := range pageList.pages {
		if pageElem == page {
			pageList.pages = append(pageList.pages[:i], pageList.pages[i+1:]...)
			break;
		}
	}
}

func (pageList *PageList) Iterator() AbstractIterator {
	return NewIterator(pageList.pages)
}
