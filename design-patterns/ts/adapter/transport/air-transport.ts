// air-transport.ts

interface AirTransport {
    getNumberOfWheels(): number;
    getNumberOfEngines(): number;
    getWeight(): number;
    getDistanceTravelled(): number;
    getTravelCostTotal(): number;
}

export default AirTransport;