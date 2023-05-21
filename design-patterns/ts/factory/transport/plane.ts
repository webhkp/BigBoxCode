// plane.ts

import Transport from "./transport";

class Plane implements Transport {
    start(): void {
        console.log("Plane started");
    }

    stop(): void {
        console.log("Plane Stopped");
    }

    repair(): void {
        console.log("Plane Repair");
    }
}

export default Plane;