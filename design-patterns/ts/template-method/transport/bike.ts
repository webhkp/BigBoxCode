// bike.ts

import Transport from "./transport";

class Bike extends Transport {
    createBody(): void {
        console.log("Creating Bike Body");
    }

    addEngine(): void {
        console.log("Adding Engine to Bike");
    }

    addWheel(): void {
        console.log("Adding 2 Wheels to Bike");
    }

    addWing(): void {
        // not required for Bike
    }
}

export default Bike;