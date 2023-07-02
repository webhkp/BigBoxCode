// redis_cache_handler.go

package main

import "fmt"

type RedisCacheHandler struct {
	nextCacheHandler CacheHandler
}

func NewRedisCacheHandler(nextCacheHandler CacheHandler) (redisCacheHandler *RedisCacheHandler) {
	redisCacheHandler = &RedisCacheHandler{}
	redisCacheHandler.nextCacheHandler = nextCacheHandler
	return
}

func (redisCacheHandler *RedisCacheHandler) HandleRequest(data Data) {
	if data.GetDataType() == DATA && len(data.GetValue()) <= 1024 {
		fmt.Printf("Caching data '%v' in Redis\n", data.GetKey())
	} else if redisCacheHandler.nextCacheHandler != nil {
		redisCacheHandler.nextCacheHandler.HandleRequest(data)
	}
}
