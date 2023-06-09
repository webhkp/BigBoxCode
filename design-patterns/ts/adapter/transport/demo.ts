// demo.ts

import AirTransportAdapter from "./air-transport-adapter";
import Bus from "./bus";
import Plane from "./plane";


console.log("Get information of Bus travel...");

const bus = new Bus();
console.log("\nNumber of wheels: " + bus.getNumberOfWheels());
console.log("Weight(kg): " + bus.getWeight());
console.log("Distance(miles): " + bus.getDistanceTravelled());
console.log("Cost per mile: " + bus.getTravelCostPerMile());


console.log("Get information of Plane travel...");

const planeTransport = new AirTransportAdapter(new Plane());
console.log("\nNumber of wheels: " + planeTransport.getNumberOfWheels());
console.log("Weight(kg): " + planeTransport.getWeight());
console.log("Distance(miles): " + planeTransport.getDistanceTravelled());
console.log("Cost per mile: " + planeTransport.getTravelCostPerMile());