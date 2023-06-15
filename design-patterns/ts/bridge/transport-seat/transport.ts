// transport.ts

import Seat from "./seat";

abstract class Transport {
    protected seat: Seat;
    constructor(seat: Seat) {
        this.seat = seat;
    }

    public abstract selectTransport(): void;
}

export default Transport;