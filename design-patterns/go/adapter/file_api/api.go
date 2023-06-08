// api.go

package main

type Api interface {
	FetchData() string
	SendData(data string)
}