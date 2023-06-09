// plane.ts

import AirTransport from "./air-transport";

class Plane implements AirTransport {
    getNumberOfWheels(): number {
        return 3;
    }
    
    getNumberOfEngines(): number {
        return 2;
    }

    getWeight(): number {
        return 127000;
    }

    getDistanceTravelled(): number {
        return 500;
    }

    getTravelCostTotal(): number {
        return 3000;
    }
}

export default Plane;