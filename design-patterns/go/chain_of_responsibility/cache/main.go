// main.go

package main

func main() {
	cacheHandler := NewDiskCacheHandler(NewRedisCacheHandler(NewCdnCacheHandler(nil)))

	data := NewData(DATA, "key1", "ABC320489un3429rn29urn29r82n9jfdn2")
	cacheHandler.HandleRequest(*data)

	data = NewData(CSS, "key2", ".some-class{border: 1px solid red; margin: 10px}")
	cacheHandler.HandleRequest(*data)
}
