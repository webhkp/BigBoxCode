// Weather.java
// All function implementations are dummy implementations, just to demonstrate Facade

package com.bigboxcode.designpattern.facade.transport;

public class Weather {

    public void getWeatherInfo(double lat, double lng) {
        System.out.println("Temperature: 20.7");
        System.out.println("Precipitation: 1%");
        System.out.println("Humidity: 73%");
        System.out.println("Wind: 8 km/h");
    }
}
