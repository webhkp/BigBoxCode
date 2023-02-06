package com.bigboxcode.designpattern.chainofresponsibility.cache;

public abstract class CacheHandler {
    public CacheHandler nextCacheHandler;

    public CacheHandler(CacheHandler nextCacheHandler) {
        this.nextCacheHandler = nextCacheHandler;
    }

    public abstract void handleRequest(Data data);
}
