// motorcycle.ts

import Transport from "./transport";

class Motorcycle implements Transport {
    start(): void {
        console.log("Motorcycle Started");
    }
    stop(): void {
        console.log("Motorcycle Stopped");
    }
    repair(): void {
        console.log("Motorcycle Repair");
    }
}


export default Motorcycle;