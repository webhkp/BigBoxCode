// transport.ts

interface Transport {
    start(): void;
    operate(): void;
    stop(): void;
}

export default Transport;