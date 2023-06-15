// plane.ts

import Seat from "./seat";
import Transport from "./transport";

class Plane extends Transport {
    constructor(seat: Seat) {
        super(seat);
    }

    selectTransport(): void {
        console.log("Plane selected for transport");
        this.seat.selectSeat();
    }
}

export default Plane;