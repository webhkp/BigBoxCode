// bicycle.ts

import Transport from "./transport";

class Bicycle implements Transport {
    start(): void {
        console.log("Bicycle Started");
    }
    stop(): void {
        console.log("Bicycle Stopped");
    }
    repair(): void {
        console.log("Bicycle Repair");
    }
}


export default Bicycle;