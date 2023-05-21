// air-transport-factory.ts

import Plane from "../transport/plane";
import TransportFactory from "./transport-factory";
import Helicopter from "./helicopter";
import Transport from "./transport";

class AirTransportFactory extends TransportFactory {
    getTransport(name: string): (Transport | null) {
        if (name.toLowerCase() === "plane") {
            return new Plane();
        }

        if (name.toLowerCase() === "helicopter") {
            return new Helicopter();
        }

        return null;
    }
}

export default AirTransportFactory;