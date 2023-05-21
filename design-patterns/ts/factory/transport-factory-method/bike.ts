// bike.ts

import Transport from "../transport/transport";

class Bike implements Transport {
    start(): void {
        console.log("Bike started");
    }

    stop(): void {
        console.log("Bike Stopped");
    }

    repair(): void {
        console.log("Bike Repair");
    }
}

export default Bike;