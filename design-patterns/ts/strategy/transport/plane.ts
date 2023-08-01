// plane.ts

import Transport from "./transport";


class Plane implements Transport {
    start(): void {
        console.log("Plane started");
    }

    stop(): void {
        console.log("Plane stopped");
    }

    repair(): void {
        console.log("Plane repair");
    }

    getInfo(): void {
        console.log("Transport type: Plane");
        console.log("Number of wheels: 3");
        console.log("Average Weight: 50,000 Pounds");
    }

    operate(): void {
        console.log("Flying plane ............");
    }
}

export default Plane;