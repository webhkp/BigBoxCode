// operation.go

package main

type Operation interface {
	Execute(opContext string) bool
}
