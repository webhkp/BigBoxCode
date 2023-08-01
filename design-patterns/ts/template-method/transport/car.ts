// car.ts

import Transport from "./transport";

class Car extends Transport {
    createBody(): void {
        console.log("Creating Car Body");
    }

    addEngine(): void {
        console.log("Adding Engine to Car");
    }

    addWheel(): void {
        console.log("Adding 4 Wheels to Car");
    }

    addWing(): void {
        // Not required for Car
    }
}

export default Car;