// disk_cache_handler.go

package main

import "fmt"

type DiskCacheHandler struct {
	nextCacheHandler CacheHandler
}

func NewDiskCacheHandler(nextCacheHandler CacheHandler) (diskCacheHandler *DiskCacheHandler) {
	diskCacheHandler = &DiskCacheHandler{}
	diskCacheHandler.nextCacheHandler = nextCacheHandler
	return
}

func (diskCacheHandler *DiskCacheHandler) HandleRequest(data Data) {
	if data.GetDataType() == DATA && len(data.GetValue()) > 1024 {
		fmt.Printf("Caching data '%v' in Disk\n", data.GetKey())
	} else if diskCacheHandler.nextCacheHandler != nil {
		diskCacheHandler.nextCacheHandler.HandleRequest(data)
	}
}
