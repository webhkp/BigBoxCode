package com.bigboxcode.designpattern.builder.request;

import java.util.HashMap;

enum RequestType {
    GET,
    POST,
    PUT,
    PATCH,
    DELETE,
}

public class Request {
    private String url;
    private RequestType type;
    private HashMap<String, String> header;
    private HashMap<String, String> body;

    private Request(Builder builder) {
        this.url = builder.url;
        this.type = builder.type;
        this.header = builder.header;
        this.body = builder.body;
    }

    public void send() {
        System.out.println("Sending Request...");
        System.out.println("URL: " + url);
        System.out.println("Type: " + type);
        System.out.println("Headers: " + header);
        System.out.println("Body: " + body);


        // Write functional code to send request
    }

    public static class Builder {
        private String url;
        private RequestType type;
        private HashMap<String, String> header = new HashMap<String,String>();
        private HashMap<String, String> body =new HashMap<String,String>();

        public Builder url(String url) {
            this.url = url;

            return this;
        }

        public Builder type(RequestType type) {
            this.type = type;

            return this;
        }

        public Builder header(String key, String value) {
            this.header.put(key, value);

            return this;
        }

        public Builder body(String key, String value) {
            this.body.put(key, value);

            return this;
        }

        public Request build() {
            return new Request(this);
        }
    }
}
