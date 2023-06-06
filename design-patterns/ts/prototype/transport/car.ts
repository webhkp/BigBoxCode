// car.ts

import Prototype from "./prototype";

class Car implements Prototype {
    make: number;
    model: string;
    color: string;

    constructor(make: number, model: string, color: string) {
        this.make = make;
        this.model = model;
        this.color = color;
    }

    clone(): Prototype {
        return new Car(this.make, this.model, this.color);
    }

    toString(): string {
        return "Make: " + this.make + " | Model: " + this.model + " | Color: " + this.color;
    }
}

export default Car;