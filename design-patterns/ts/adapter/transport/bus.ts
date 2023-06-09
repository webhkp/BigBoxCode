// bus.ts

import Transport from "./transport";

class Bus implements Transport {
    getNumberOfWheels(): number {
        return 4;
    }

    getWeight(): number {
        return 10000;
    }

    getDistanceTravelled(): number {
        return 1000;
    }
    
    getTravelCostPerMile(): number {
        return 5;
    }
}

export default Bus;