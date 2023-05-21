// car.ts

import Transport from "../transport/transport";

class Car implements Transport {
    start(): void {
        console.log("Car started");
    }

    stop(): void {
        console.log("Car Stopped");
    }

    repair(): void {
        console.log("Car Repair");
    }
}

export default Car;