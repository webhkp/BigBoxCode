// bus.ts

import Transport from "../transport/transport";

class Bus implements Transport {
    start(): void {
        console.log("Bus started");
    }

    stop(): void {
        console.log("Bus Stopped");
    }

    repair(): void {
        console.log("Bus Repair");
    }
}

export default Bus;