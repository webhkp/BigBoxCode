// demo.ts

import Car from "./car";
import Plane from "./plane";
import Transport from "./transport";


const car: Transport = new Car();
car.build();

const plane: Transport = new Plane();
plane.build();
