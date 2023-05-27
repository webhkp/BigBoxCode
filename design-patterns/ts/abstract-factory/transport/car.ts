// car.ts

import Transport from "./transport";

class Car implements Transport {
    start(): void {
        console.log("Car Started");
    }
    stop(): void {
        console.log("Car Stopped");
    }
    repair(): void {
        console.log("Car Repair");
    }
}


export default Car;