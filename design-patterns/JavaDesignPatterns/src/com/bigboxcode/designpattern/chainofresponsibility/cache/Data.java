package com.bigboxcode.designpattern.chainofresponsibility.cache;

enum DATA_TYPE {
    DATA,
    JAVASCRIPT,
    CSS
};

public class Data {
    private final DATA_TYPE type;
    private final String data;
    private final String key;

    public Data(DATA_TYPE type, String key, String data) {
        this.type = type;
        this.key = key;
        this.data = data;
    }

    public DATA_TYPE getType() {
        return type;
    }

    public String getKey() {
        return key;
    }

    public String getData() {
        return data;
    }
}
