// Demo.java

package com.bigboxcode.designpattern.prototype.prototype.request;

public class Demo {
    public static void main(String[] args) {
        HttpRequest httpRequest = new HttpRequest();
        httpRequest.setUrl("https://bigboxcode.com/create-data-test");
        httpRequest.setType(RequestType.POST);
        httpRequest.addHeader("X-AUTH-TOKEN", "someTokeHere");
        httpRequest.addBody("code", "88C3ABK");

        httpRequest.send();

        System.out.println("\n----------------------------------------------\n");

        HttpRequest secondRequest = (HttpRequest) httpRequest.clone();
        secondRequest.setType(RequestType.GET);
        secondRequest.setUrl("https://bigboxcode.com/some-other-endpoint");
        secondRequest.removeBody("code");

        secondRequest.send();
    }
}
