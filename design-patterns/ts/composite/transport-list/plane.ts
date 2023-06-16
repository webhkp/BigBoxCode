// plane.ts

import Transport from "./transport";

class Plane implements Transport {
    start(): void {
        console.log("Starting Plane...");
    }

    operate(): void {
        console.log("Flying Plane");
    }

    stop(): void {
        console.log("Stopping Plane...");
    }
}

export default Plane;