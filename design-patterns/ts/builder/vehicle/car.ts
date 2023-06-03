// car.ts

class Car {
    private wheel: number;
    private engine: number;
    private seat: number;
    private door: number;
    private interior: boolean;

    constructor(noOfWheel: number, noOfEngine: number, noOfSeat: number, noOfDoor: number, interior: boolean) {
        this.wheel = noOfWheel;
        this.engine = noOfEngine;
        this.seat = noOfSeat;
        this.door = noOfDoor;
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

    isInterior(): boolean {
        return this.interior;
    }

    toString(): string {
        return `Car:
        Wheel -> ${this.wheel}
        Engine -> ${this.engine}
        Seat -> ${this.seat}
        Door -> ${this.door}
        Interior -> ${this.interior}`;
    }
}

export default Car;