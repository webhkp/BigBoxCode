// helicopter.ts

import AirTransport from "./air-transport";

class Helicopter implements AirTransport {
    getNumberOfWheels(): number {
        return 0;
    }

    getNumberOfEngines(): number {
        return 1;
    }

    getWeight(): number {
        return 12000;
    }

    getDistanceTravelled(): number {
        return 180;
    }
    
    getTravelCostTotal(): number {
        return 20000;
    }
}

export default Helicopter;