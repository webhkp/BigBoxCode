// bike.ts

import Transport from "./transport";

class Bike implements Transport {
    start(): void {
        console.log("Bike started");
    }
    
    stop(): void {
        console.log("Bike stopped");
    }

    repair(): void {
        console.log("Bike repair");
    }

    getInfo(): void {
        console.log("Transport type: Bike");
        console.log("Number of wheels: 2");
        console.log("Average Weight: 700 Pounds");
    }

    operate(): void {
        console.log("Riding Bike ............");
    }
}

export default Bike;