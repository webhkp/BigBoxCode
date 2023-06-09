// transport.ts

interface Transport {
    getNumberOfWheels(): number;
    getWeight(): number;
    getDistanceTravelled(): number;
    getTravelCostPerMile(): number;
}

export default Transport;