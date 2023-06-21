// travel-facade.ts

import Car from "./car";
import Direction from "./direction";
import Point from "./point";
import Toll from "./toll";
import Weather from "./weather";


class TravelFacade {
    private startLat: number;
    private startLng: number;

    private endLat: number;
    private endLng: number;

    private direction: Direction;
    private toll: Toll;
    private car: Car;
    private weather: Weather;

    // define constructor
    constructor(startLat: number, startLng: number, endLat: number, endLng: number) {
        this.startLat = startLat;
        this.startLng = startLng;
        this.endLat = endLat;
        this.endLng = endLng;

        // Initialize classes
        this.direction = new Direction(startLat, startLng, endLat, endLng);
        this.car = new Car();
        this.toll = new Toll();
        this.weather = new Weather();
    }

    getRoute(): Point[] {
        return this.direction.getFullRoute();
    }

    getLocationInfo(lat: number, lng: number) {
        this.direction.getLocationDetails(lat, lng);
        this.weather.getWeatherInfo(lat, lng);
    }

    getCurrentLocation(): Point {
        return this.direction.getCurrentLocation();
    }

    operateCar(): void {
        const fullRoute = this.direction.getFullRoute();

        this.car.startEngine();

        for (let point of fullRoute) {
            const nextMove = this.direction.getNextMove();

            switch (nextMove) {
                case "straight": this.car.goStraight(); break;
                case "left": this.car.goLeft(); break;
                case "right": this.car.goRight(); break;
            }
        }

        this.car.stopEngine();
    }

    getTotalTollAmount(lat: number, lng: number) {
        console.log("Total Toll Amount: " + this.toll.getTotalToll(lat, lng));
    }

}

export default TravelFacade;