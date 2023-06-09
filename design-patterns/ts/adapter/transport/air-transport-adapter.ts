// air-transport-adapter.ts

import AirTransport from "./air-transport";
import Transport from "./transport";

class AirTransportAdapter implements Transport {
    private airTransport: AirTransport;

    constructor(airTransport: AirTransport) {
        this.airTransport = airTransport;
    }

    getNumberOfWheels(): number {
        return this.airTransport.getNumberOfWheels();
    }

    getWeight(): number {
        return this.airTransport.getWeight();
    }

    getDistanceTravelled(): number {
        var distanceInNauticalMile = this.airTransport.getDistanceTravelled();
        return distanceInNauticalMile * 1.151;
    }
    
    getTravelCostPerMile(): number {
        var totalCost = this.airTransport.getTravelCostTotal();
        return totalCost / this.getDistanceTravelled();
    }
}

export default AirTransportAdapter;