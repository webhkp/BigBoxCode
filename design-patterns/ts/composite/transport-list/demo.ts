// demo.ts

import Bike from "./bike";
import Car from "./car";
import Plane from "./plane";
import TransportGroup from "./transport-group";

const bike = new Bike();
const plane = new Plane();
const car = new Car();
const secondCar = new Car();

const transports = new TransportGroup();
transports.addTransport(bike);
transports.addTransport(plane);
transports.addTransport(car);
transports.addTransport(secondCar);

console.log("-----------------Output with 4 transports------------------\n");

transports.start();
transports.operate();
transports.stop();

console.log("\n-----------------Output when plane is removed------------------\n");

transports.removeTransport(plane);

transports.start();
transports.operate();
transports.stop();