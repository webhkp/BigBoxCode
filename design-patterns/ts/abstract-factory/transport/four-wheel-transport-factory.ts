// four-wheel-transport-factory.ts

import AbstractTransportFactory from "./abstract-transport-factory";
import Car from "./car";
import Transport from "./transport";
import Truck from "./truck";

class FourWheelTransportFactory implements AbstractTransportFactory {
    getTransport(type: string): (Transport | null) {
        if (type.toLowerCase() === "car") {
            return new Car();
        }

        if (type.toLowerCase() === "truck") {
            return new Truck();
        }

        return null;
    }
}

export default FourWheelTransportFactory;