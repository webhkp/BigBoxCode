// Map.java
// All function implementations are dummy implementations, just to demonstrate Facade

package com.bigboxcode.designpattern.facade.transport;

import java.util.Random;

public class Map {

    private double startLat;
    private double startLng;

    private double endLat;
    private double endLng;

    // define constructor
    public Map(double startLat, double startLng, double endLat, double endLng) {
        this.startLat = startLat;
        this.startLng = startLng;
        this.endLat = endLat;
        this.endLng = endLng;
    }

    public Point getCurrentLocation() {
        Random r = new Random();
        double currentLat = (r.nextInt((int)((90-(-90))*10+1))-90*10) / 10.0;
        double currentLng = (r.nextInt((int)((180-(-180))*10+1))-180*10) / 10.0;

        return new Point(currentLat, currentLng);
    }

    public String getNextMove() {
        Random rand = new Random();
        String[] nextMoves = {"straight", "left", "right"};

        return nextMoves[rand.nextInt(nextMoves.length)];
    }

    public Point[] getFullRoute() {
        Point[] points = new Point[10];
        Random r = new Random();

        for (int i = 0; i < 10; i++) {
            Point tempPoint = new Point(
                    (r.nextInt((int) ((90 - (-90)) * 10 + 1)) - 90 * 10) / 10.0,
                        (r.nextInt((int) ((180 - (-180)) * 10 + 1)) - 180 * 10) / 10.0
            );

            points[i] = tempPoint;
        }

        return points;
    }

    public void getLocationDetails(double lat, double lng) {
        System.out.println("Country: ABC");
        System.out.println("City: DEF");
        System.out.println("State: GHI");
        System.out.println("Zip: 101010");
    }
    
    public static class Point {
        private double lat;
        private double lng;
        
        public Point(double lat, double lng) {
            this.lat = lat;
            this.lng = lng;
        }

        public double getLat() {
            return lat;
        }

        public double getLng() {
            return lng;
        }
    }
}