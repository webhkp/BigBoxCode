// abstract-transport-factory.ts

import Transport from "./transport";

interface AbstractTransportFactory {
    getTransport(type: string): (Transport | null);
}

export default AbstractTransportFactory;