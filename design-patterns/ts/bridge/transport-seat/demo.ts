// demo.ts

import BusinessClassSeat from "./business-class-seat";
import EconomyClassSeat from "./economy-class-seat";
import Plane from "./plane";
import Train from "./train";

var plane = new Plane(new BusinessClassSeat());
plane.selectTransport();

var plane2 = new Plane(new EconomyClassSeat());
plane2.selectTransport();

var train = new Train(new EconomyClassSeat());
train.selectTransport();
