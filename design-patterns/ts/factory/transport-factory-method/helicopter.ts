// helicopter.ts

import Transport from "../transport/transport";

class Helicopter implements Transport {
    start(): void {
        console.log("Helicopter started");
    }

    stop(): void {
        console.log("Helicopter Stopped");
    }

    repair(): void {
        console.log("Helicopter Repair");
    }
}

export default Helicopter;