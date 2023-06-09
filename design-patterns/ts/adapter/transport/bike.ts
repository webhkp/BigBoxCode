// bike.ts

import Transport from "./transport";

class Bike implements Transport {
    getNumberOfWheels(): number {
        return 2;
    }

    getWeight(): number {
        return 700;
    }

    getDistanceTravelled(): number {
        return 80;
    }

    getTravelCostPerMile(): number {
        return 4;
    }
}

export default Bike;