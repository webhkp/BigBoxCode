// abstract_iterator.go

package main

type AbstractIterator interface {
	HasNext() bool
	Next() Page
}
