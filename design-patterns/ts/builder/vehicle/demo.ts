// demo.ts

import Car from "./car";
import CarBuilder from "./car-builder";
import Plane from "./plane";
import PlaneBuilder from "./plane-builder";
import VehicleProducer from "./vehicle-producer";

const vehicleProducer = new VehicleProducer();

console.log("Building Car:\n");

const carBuilder = new CarBuilder();
vehicleProducer.buildCar(carBuilder);

const car = carBuilder.build();
console.log("Final result:\n" + car);


console.log("Building Car:\n");

const planeBuilder = new PlaneBuilder();
vehicleProducer.buildPlane(planeBuilder);

const plane = planeBuilder.build();
console.log("Final result:\n" + plane);