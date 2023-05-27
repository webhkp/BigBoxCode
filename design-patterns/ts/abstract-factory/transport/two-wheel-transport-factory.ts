// two-wheel-transport-factory.ts

import AbstractTransportFactory from "./abstract-transport-factory";
import Bicycle from "./bicycle";
import Motorcycle from "./motorcycle";
import Transport from "./transport";

class TwoWheelTransportFactory implements AbstractTransportFactory {
    getTransport(type: string): (Transport | null) {
        if (type.toLowerCase() === "bicycle") {
            return new Bicycle();
        }

        if (type.toLowerCase() === "motorcycle") {
            return new Motorcycle();
        }

        return null;
    }
}

export default TwoWheelTransportFactory;