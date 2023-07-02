// cache_handler.go

package main

type CacheHandler interface {
	HandleRequest(data Data)
}

// type CacheHandler struct {
// 	nextCacheHandler *CacheHandler
// }

// func NewCacheHandler(nextCacheHandler *CacheHandler) (cacheHandler *CacheHandler) {
// 	cacheHandler = &CacheHandler{}
// 	cacheHandler.nextCacheHandler = nextCacheHandler
// 	return
// }

// func (cacheHandler *CacheHandler) HandleRequest(data *Data) {
// }