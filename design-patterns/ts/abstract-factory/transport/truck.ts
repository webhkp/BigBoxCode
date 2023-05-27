// truck.ts

import Transport from "./transport";


class Truck implements Transport {
    start(): void {
        console.log("Truck Started");
    }

    stop(): void {
        console.log("Truck Stopped");
    }

    repair(): void {
        console.log("Truck Repair");
    }
}

export default Truck;