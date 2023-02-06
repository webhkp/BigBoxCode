package com.bigboxcode.designpattern.chainofresponsibility.cache;

public class RedisCacheHandler extends CacheHandler {
    public RedisCacheHandler(CacheHandler nextCacheHandler) {
        super(nextCacheHandler);
    }

    @Override
    public void handleRequest(Data data) {
        if (data.getType() == DATA_TYPE.DATA && data.getData().length() <= 1024) {
            // Write code to cache data in Redis

            System.out.println("Caching data '" + data.getKey() + "' in Redis");
        } else if (nextCacheHandler != null) {
            nextCacheHandler.handleRequest(data);
        }
    }
}