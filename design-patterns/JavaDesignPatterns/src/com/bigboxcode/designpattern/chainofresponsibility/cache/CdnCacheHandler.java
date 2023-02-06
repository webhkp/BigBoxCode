package com.bigboxcode.designpattern.chainofresponsibility.cache;

public class CdnCacheHandler extends CacheHandler {
    public CdnCacheHandler(CacheHandler nextCacheHandler) {
        super(nextCacheHandler);
    }

    @Override
    public void handleRequest(Data data) {
        if (data.getType() == DATA_TYPE.CSS || data.getType() == DATA_TYPE.JAVASCRIPT) {
            // Write code to send the data file to some CDN

            System.out.println("Caching file '" + data.getKey() + "' in CDN");
        } else if (nextCacheHandler != null) {
            nextCacheHandler.handleRequest(data);
        }
    }
}