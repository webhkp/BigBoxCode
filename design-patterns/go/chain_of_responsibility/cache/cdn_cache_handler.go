// cdn_cache_handler.go

package main

import "fmt"

type CdnCacheHandler struct {
	nextCacheHandler CacheHandler
}

func NewCdnCacheHandler(nextCacheHandler CacheHandler) (cdnCacheHandler *CdnCacheHandler) {
	cdnCacheHandler = &CdnCacheHandler{}
	cdnCacheHandler.nextCacheHandler = nextCacheHandler
	return
}

func (cdnCacheHandler *CdnCacheHandler) HandleRequest(data Data) {
	if data.GetDataType() == CSS || data.GetDataType() == JAVASCRIPT {
		fmt.Printf("Caching file '%v' in CDN\n", data.GetKey())
	} else if cdnCacheHandler.nextCacheHandler != nil {
		cdnCacheHandler.nextCacheHandler.HandleRequest(data)
	}
}
