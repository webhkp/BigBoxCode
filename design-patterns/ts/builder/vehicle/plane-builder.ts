// plane-builder.ts

import Plane from "./plane";
import VehicleBuilder from "./vehicle-builder";

class PlaneBuilder implements VehicleBuilder{
    private wheel: number = 0;
    private engine: number = 0;
    private seat!: number;
    private interior!: boolean;
    private door: number = 0;
    private wing: number = 0;

    addWheel(noOfWheel: number) {
        console.log("Add " + noOfWheel + " wheels");
        this.wheel += noOfWheel;
    }

    addEngine(noOfEngine: number) {
        console.log("Add " + noOfEngine + " engine");
        this.engine += noOfEngine;
    }

    addSeat(noOfSeat: number) {
        console.log("Add " + noOfSeat + " Seat");
        this.seat = noOfSeat;
    }

    addInterior() {
        console.log("Add interior");
        this.interior = true;
    }

    addDoor(noOfDoor: number) {
        console.log("Add " + noOfDoor + " door");
        this.door += noOfDoor;
    }

    addWing(noOfWings: number) {
        console.log("Add " + noOfWings + " wing");
        this.wing += noOfWings;
    }

    build(): Plane {
        const plane: Plane = new Plane(this.wheel, this.engine, this.seat, this.door, this.wing, this.interior);

        return plane;
    }
}

export default PlaneBuilder;