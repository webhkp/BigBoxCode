// demo.ts

import HttpRequest, { RequestType } from "./http-request";

const request = new HttpRequest.Builder()
    .setUrl("https://bigboxcode.com/request-test")
    .setType(RequestType.POST)
    .setHeader("X-AUTH-TOKEN", "someTokeHere")
    .setHeader("X-SOME-HEADER", "someRandomHeaderValueHere")
    .setBody("unit_id", "99")
    .setBody("code", "88C3ABK")
    .build();

// Send request
request.send();