// transport-strrategy.ts

import Transport from "./transport";

class TransportStrategy {
    private transport: Transport;

    constructor(transport: Transport) {
        this.transport = transport;
    }

    execute(): void {
        this.transport.start();

        this.transport.getInfo();

        this.transport.operate();
    }

    repair(): void {
        this.transport.repair();
    }

    stop(): void {
        this.transport.stop();
    }
}

export default TransportStrategy;