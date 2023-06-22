// direction.ts

import Point from "./point";

class Direction {
    private startLat: number;
    private startLng: number;
    private endLat: number;
    private endLng: number;

    constructor(startLat: number, startLng: number, endLat: number, endLng: number) {
        this.startLat = startLat;
        this.startLng = startLng;
        this.endLat = endLat;
        this.endLng = endLng;
    }

    getLocationDetails(lat: number, lng: number) {
        console.log("Country: ABC");
        console.log("City: DEF");
        console.log("State: GHI");
        console.log("Zip: 101010");
    }

    getCurrentLocation(): Point {
        // This is some random calculation for demo purpose
        const currentLat = (Math.random() * ((90 - (-90) * 10 + 1) - 90 * 10)) / 10.0;
        const currentLng = (Math.random() * ((180 - (-180) * 10 + 1) - 180 * 10)) / 10.0;

        return new Point(currentLat, currentLng);
    }

    getNextMove(): string {
        // This is some random calculation for demo purpose
        const nextMoves = ["straight", "left", "right"];
        return nextMoves[Math.floor(Math.random() * nextMoves.length)];
    }

    getFullRoute(): Point[] {
        const points: Point[] = [];

        for (let i = 0; i < 10; i++) {
            // This is some random calculation for demo purpose
            const currentLat = (Math.random() * ((90 - (-90) * 10 + 1) - 90 * 10)) / 10.0;
            const currentLng = (Math.random() * ((180 - (-180) * 10 + 1) - 180 * 10)) / 10.0;

            points[i] = new Point(currentLat, currentLng);
        }

        return points;
    }
}

export default Direction;