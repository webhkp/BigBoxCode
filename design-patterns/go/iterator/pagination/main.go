// main.go

package main

import "fmt"

func main() {
	pageList := populatePageList()
	paginator := pageList.Iterator()
	for paginator.HasNext() {
		page := paginator.Next()

		fmt.Printf("Page Number: %v\n", page.GetNumber())
		fmt.Printf("Page Path: %v\n\n", page.GetPath())
	}
}

func populatePageList() (*PageList) {
	pageList := NewPageList()

	for i := 0; i < 10; i++ {
		page := NewPage()
		page.SetNumber(i)
		pageList.Add(*page)
	}

	return pageList
}

