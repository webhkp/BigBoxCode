package com.bigboxcode.designpattern.chainofresponsibility.cache;

public class Demo {

    public static void main(String[] args) {
        DiskCacheHandler cacheHandler = new DiskCacheHandler(new RedisCacheHandler(new CdnCacheHandler(null)));

        Data data = new Data(DATA_TYPE.DATA, "key1", "ABC320489un3429rn29urn29r82n9jfdn2");

        cacheHandler.handleRequest(data);

        data = new Data(DATA_TYPE.CSS, "key2", ".some-class{border: 1px solid red; margin: 10px}");

        cacheHandler.handleRequest(data);
    }
}
