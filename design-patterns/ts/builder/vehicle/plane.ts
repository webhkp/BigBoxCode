// plane.ts

class Plane {
    private wheel: number;
    private engine: number;
    private seat: number;
    private door: number;
    private wing: number;
    private interior: boolean;

    constructor(
        noOfWheel: number,
        noOfEngine: number,
        noOfSeat: number,
        noOfDoor: number,
        wing: number,
        interior: boolean) {
        this.wheel = noOfWheel;
        this.engine = noOfEngine;
        this.seat = noOfSeat;
        this.door = noOfDoor;
        this.wing = wing;
        this.interior = interior;
    }

    getWheel(): number {
        return this.wheel;
    }

    getEngine(): number {
        return this.engine;
    }

    getSeat(): number {
        return this.seat;
    }

    getDoor(): number {
        return this.door;
    }

    getWing(): number {
        return this.wing;
    }

    isInterior(): boolean {
        return this.interior;
    }

    toString(): string {
        return `Plane:
        Wheel -> ${this.wheel}
        Engine -> ${this.engine}
        Seat -> ${this.seat}
        Door -> ${this.door}
        Wing -> ${this.wing}
        Interior -> ${this.interior}`;
    }
}

export default Plane;