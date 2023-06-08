// file.go

package main

type File interface {
	ReadFile() string
	WriteFile(input string)
}
