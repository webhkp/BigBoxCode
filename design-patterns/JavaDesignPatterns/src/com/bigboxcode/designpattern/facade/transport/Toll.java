// Toll.java
// All function implementations are dummy implementations, just to demonstrate Facade

package com.bigboxcode.designpattern.facade.transport;

import java.util.Random;

public class Toll {
    public Map.Point[] getTollPoints(double lat, double lng) {
        Map.Point[] points = new Map.Point[100];
        Random r = new Random();

        for (int i = 0; i < 3; i++) {
            Map.Point tempPoint = new Map.Point(
                    (r.nextInt((int) ((90 - (-90)) * 10 + 1)) - 90 * 10) / 10.0,
                    (r.nextInt((int) ((180 - (-180)) * 10 + 1)) - 180 * 10) / 10.0
            );

            points[i] = tempPoint;
        }

        return points;
    }

    public double getTollAmount(int tollPointId) {
        Random r = new Random();
        return (r.nextInt((int) ((100 - 1) * 10 + 1)) + 10) / 10.0;
    }

    public double getTotalToll(double lat, double lng) {
        Random r = new Random();
        return (r.nextInt((int) ((100 - 1) * 10 + 1)) + 10) / 10.0;
    }
}
