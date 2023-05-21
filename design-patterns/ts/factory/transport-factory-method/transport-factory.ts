// transport-factory.ts

import Transport from "./transport";

abstract class TransportFactory {
    operateTransport(name: string): void {
        const transport = this.getTransport(name);

        transport?.start();
        transport?.stop();
    }

    repairTransport(name: string): void {
        const transport = this.getTransport(name);

        transport?.repair();
    }

    abstract getTransport(name: string): (Transport | null);
}

export default TransportFactory;