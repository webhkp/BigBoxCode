// transport.ts

interface Transport {
    start(): void;
    stop(): void;
    repair(): void;
}

export default Transport;