package com.bigboxcode.designpattern.chainofresponsibility.cache;

public class DiskCacheHandler extends CacheHandler {
    public DiskCacheHandler(CacheHandler nextCacheHandler) {
        super(nextCacheHandler);
    }

    @Override
    public void handleRequest(Data data) {
        if (data.getType() == DATA_TYPE.DATA && data.getData().length() > 1024) {
            // Write code to cache data in Disk

            System.out.println("Caching data '" + data.getKey() + "' in Disk");
        } else if (nextCacheHandler != null) {
            nextCacheHandler.handleRequest(data);
        }
    }
}
