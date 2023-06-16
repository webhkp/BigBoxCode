// car.ts

import Transport from "./transport";


class Car implements Transport {
    start(): void {
        console.log("Starting Car...");
    }

    operate(): void {
        console.log("Driving Car");
    }

    stop(): void {
        console.log("Stopping Car...");
    }
}

export default Car;