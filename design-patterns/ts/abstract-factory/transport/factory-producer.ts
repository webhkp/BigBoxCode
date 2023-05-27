// factory-producer.ts

import AbstractTransportFactory from "./abstract-transport-factory";
import FourWheelTransportFactory from "./four-wheel-transport-factory";
import TwoWheelTransportFactory from "./two-wheel-transport-factory";

class FactoryProducer {
    static getFactory(numberOfWheels: number): (AbstractTransportFactory | null) {
        if (numberOfWheels == 2) {
            return new TwoWheelTransportFactory();
        }

        if (numberOfWheels == 4) {
            return new FourWheelTransportFactory();
        }

        return null;
    }
}

export default FactoryProducer;