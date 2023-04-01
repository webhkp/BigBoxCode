// ThirdPartApi.java

package com.bigboxcode.designpattern.adapter.api;

public class ThirdPartyApi implements Api {
    @Override
    public String fetchData() {
        // code to fetch data from Third Party API

        System.out.println("Fetching data from Third Party API");

        return "Data read from Third Party Api";
    }

    @Override
    public void sendData(String data) {
        // code to send data to Third Party API

        System.out.println("Sending data to Third Party API: " + data);
    }
}
