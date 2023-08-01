// demo.ts

import Bike from "./bike";
import Car from "./car";
import Plane from "./plane";
import TransportStrategy from "./transport-strategy";


// Use bike
console.log("Operating Bike:");

let myTransport = new TransportStrategy(new Bike());
myTransport.execute();
myTransport.stop();

// Use car
console.log("\n\nOperating Car:");

myTransport = new TransportStrategy(new Car());
myTransport.execute();
myTransport.stop();
myTransport.repair();

// Use plane
console.log("\n\nOperating plane:");

myTransport = new TransportStrategy(new Plane());
myTransport.execute();
myTransport.stop();

