// bike.ts

import Transport from "./transport";

class Bike implements Transport {
    start(): void {
        console.log("Starting Bike...");
    }

    operate(): void {
        console.log("Riding Bike");
    }

    stop(): void {
        console.log("Stopping Bike...");
    }
}

export default Bike;