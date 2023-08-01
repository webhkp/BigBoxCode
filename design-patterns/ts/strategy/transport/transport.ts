// transport.ts

interface Transport {
    start(): void;
    stop(): void;
    repair(): void;
    getInfo(): void;
    operate(): void;
}

export default Transport;