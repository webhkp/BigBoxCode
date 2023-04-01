// Demo.java

package com.bigboxcode.designpattern.adapter.api;

public class Demo {
    public static void main(String[] args) {
        // make a call to third part API for testing
        Api thirdPartyApi = new ThirdPartyApi();
        thirdPartyApi.fetchData();
        thirdPartyApi.sendData("1234");


        // Make a call to the file via FileAdapter
        File file = new FileOp();
        FileAdapter fileAdapter = new FileAdapter(file);
        fileAdapter.fetchData();
        fileAdapter.sendData("ABCDEF");
    }
}
