// car.ts

import Transport from "./transport";

class Car implements Transport {
    start(): void {
        console.log("Car started");
    }

    stop(): void {
        console.log("Car stopped");
    }

    repair(): void {
        console.log("Car repair");
    }

    getInfo(): void {
        console.log("Transport type: Car");
        console.log("Number of wheels: 4");
        console.log("Average Weight: 4,000 Pounds");
    }

    operate(): void {
        console.log("Driving car ............");
    }
}

export default Car;