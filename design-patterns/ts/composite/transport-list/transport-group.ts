// transport-group.ts

import Transport from "./transport";

class TransportGroup implements Transport {
    private transportList: Transport[] = [];

    start(): void {
        for (let transport of this.transportList) {
            transport.start();
        }
    }

    operate(): void {
        for (let transport of this.transportList) {
            transport.operate();
        }
    }

    stop(): void {
        for (let transport of this.transportList) {
            transport.stop();
        }
    }

    addTransport(transport: Transport): void {
        this.transportList.push(transport);
    }

    removeTransport(transport: Transport): void {
        this.transportList.splice(this.transportList.indexOf(transport), 1);
    }
}

export default TransportGroup;