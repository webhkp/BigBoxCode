// demo.ts

import TransportFactory from "./transport-factory";
import AirTransportFactory from "./air-transport-factory";
import RoadTransportFactory from "./road-transport-factory";

const roadTransportFactory: TransportFactory = new RoadTransportFactory();
const airTransportFactory: TransportFactory = new AirTransportFactory();

roadTransportFactory?.operateTransport("bus");


airTransportFactory.operateTransport("helicopter");


roadTransportFactory.repairTransport("bike");