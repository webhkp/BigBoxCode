// TravelFacade.java
// All function implementations are dummy implementations, just to demonstrate Facade

package com.bigboxcode.designpattern.facade.transport;

public class TravelFacade {
    double startLat;
    double startLng;

    double endLat;
    double endLng;

    Map map;
    Toll toll;
    Car car;
    Weather weather;

    // define constructor
    public TravelFacade(double startLat, double startLng, double endLat, double endLng) {
        this.startLat = startLat;
        this.startLng = startLng;
        this.endLat = endLat;
        this.endLng = endLng;

        // Initialize classes
        map = new Map(startLat, startLng, endLat, endLng);
        car = new Car();
        toll = new Toll();
        weather = new Weather();
    }

    public Map.Point[] getRoute() {
        return map.getFullRoute();
    }

    public void getLocationInfo(double lat, double lng) {
        map.getLocationDetails(lat, lng);
        weather.getWeatherInfo(lat, lng);
    }

    public Map.Point getCurrentLocation() {
        return map.getCurrentLocation();
    }

    public void operateCar() {
        Map.Point[] fullRoute = map.getFullRoute();

        car.startEngine();

        for (Map.Point point: fullRoute) {
            String nextMove = map.getNextMove();

            if (nextMove.equals("straight")) {
                car.goStraight();
            } else if (nextMove.equals("left")) {
                car.goLeft();
            } else if (nextMove.equals("right")) {
                car.goRight();
            }
        }

        car.stopEngine();
    }

    public void getTotalTollAmount(double lat, double lng) {
        System.out.println("Total Toll Amount: " + toll.getTotalToll(lat, lng));
    }

}
