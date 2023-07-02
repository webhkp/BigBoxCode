// cache_handler.go

package main

type CacheHandler interface {
	HandleRequest(data Data)
}