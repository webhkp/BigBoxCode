// road-transport-factory.ts

import Car from "../transport/car";
import TransportFactory from "./transport-factory";
import Bus from "./bus";
import Bike from "./bike";
import Transport from "./transport";

class RoadTransportFactory extends TransportFactory {
    getTransport(name: string): (Transport | null) {
        if (name.toLowerCase() === "car") {
            return new Car();
        }

        if (name.toLowerCase() === "bike") {
            return new Bike();
        }

        if (name.toLowerCase() === "bus") {
            return new Bus();
        }

        return null;
    }
}

export default RoadTransportFactory;