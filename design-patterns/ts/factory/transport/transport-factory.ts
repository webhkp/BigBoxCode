// transport-factory.ts

import Transport from "./transport";
import Bike from "./bike";
import Car from "./car";
import Plane from "./plane";

class TransportFactory {

    // Make this method static if needed
    getTransport(type: string): (Transport | null) {
        if (type.toLocaleLowerCase() === "bike") {
            return new Bike();
        }

        if (type.toLocaleLowerCase() === "car") {
            return new Car();
        }

        if (type.toLocaleLowerCase() === "plane") {
            return new Plane();
        }

        return null;
    }
}

export default TransportFactory;