// train.ts

import Seat from "./seat";
import Transport from "./transport";

class Train extends Transport {
    constructor(seat: Seat) {
        super(seat);
    }
    selectTransport(): void {
        console.log("Train selected for transport");
        this.seat.selectSeat();
    }
}

export default Train;