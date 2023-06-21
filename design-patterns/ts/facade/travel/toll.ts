// toll.ts

import Point from "./point";

class Toll {
    getTollPoints(lat: number, lng: number): Point[] {
        const points: Point[] = [];

        for (let i = 0; i < 10; i++) {
            // This is some random calculation for demo purpose
            const currentLat = (Math.random() * ((90 - (-90) * 10 + 1) - 90 * 10)) / 10.0;
            const currentLng = (Math.random() * ((180 - (-180) * 10 + 1) - 180 * 10)) / 10.0;

            points[i] = new Point(currentLat, currentLng);
        }

        return points;
    }

    getTollAmount(tollPointId: number): number {
        // This is some random calculation for demo purpose
        return (Math.random() * (((100 - 1) * 10 + 1)) + 10) / 10.0;
    }

    getTotalToll(lat: number, lng: number): number {
        // This is some random calculation for demo purpose
        return (Math.random() * (((100 - 1) * 10 + 1)) + 10) / 10.0;
    }
}

export default Toll;