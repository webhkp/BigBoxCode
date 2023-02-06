package com.bigboxcode.designpattern.facade.transport;

public class Demo {
    public static void main(String[] args) {
        TravelFacade travelFacade = new TravelFacade(10, 10, 20, 30);

        Map.Point currentLocation = travelFacade.getCurrentLocation();

        System.out.println("Current Latitude: " + currentLocation.getLat());
        System.out.println("Current Longitude: " + currentLocation.getLng());

        System.out.println("-------------------------------------------");

        travelFacade.getLocationInfo(20, 30);

        System.out.println("-------------------------------------------");

        travelFacade.getTotalTollAmount(20, 30);

        System.out.println("-------------------------------------------");

        travelFacade.operateCar();
    }
}
