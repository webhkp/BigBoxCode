// HttpRequest.java

package com.bigboxcode.designpattern.prototype.request;

import java.util.HashMap;

enum RequestType {
    GET,
    POST,
    PUT,
    PATCH,
    DELETE,
}

public class HttpRequest extends Request {

    private String url;

    private RequestType type;
    private HashMap<String, String> header = new HashMap<>();
    private HashMap<String, String> body =new HashMap<>();

    public void setUrl(String url) {
        this.url = url;
    }

    public void setType(RequestType type) {
        this.type = type;
    }

    public void addHeader(String key, String value) {
        this.header.put(key, value);
    }

    public void removeHeader(String key) {
        this.header.remove(key);
    }

    public void addBody(String key, String value) {
        this.body.put(key, value);
    }

    public void removeBody(String key) {
        this.body.remove(key);
    }

    public void send() {
        System.out.println("Sending Request...");
        System.out.println("URL: " + url);
        System.out.println("Type: " + type);
        System.out.println("Headers: " + header);
        System.out.println("Body: " + body);


        // Write functional code to send request
    }

}
