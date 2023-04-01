// NativeApi.java

package com.bigboxcode.designpattern.adapter.api;

public class NativeApi implements Api {
    @Override
    public String fetchData() {
        // code to fetch data from native API

        System.out.println("Fetching data from Native API");

        return "Data read from Native Api";
    }

    @Override
    public void sendData(String data) {
        // code to send data to native API

        System.out.println("Sending data to Native API: " + data);
    }
}
