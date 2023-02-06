package com.bigboxcode.designpattern.builder.request;

public class Demo {
    public static void main(String[] args) {
        // Build the request step by step
        Request request = new Request.Builder()
                .url("https://bigboxcode.com/request-test")
                .type(RequestType.POST)
                .header("X-AUTH-TOKEN", "someTokeHere")
                .header("X-SOME-HEADER", "someRandomHeaderValueHere")
                .body("unit_id", "99")
                .body("code", "88C3ABK")
                .build();

        // Send request
        request.send();
    }
}
