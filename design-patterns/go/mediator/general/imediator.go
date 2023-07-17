// imediator.go

package main

type IMediator interface {
	SendMessage(colleague Colleague, msg string)
}