// economy-class-seat.ts

import Seat from "./seat";

class EconomyClassSeat implements Seat {
    public selectSeat(): void {
        console.log("Select an Economy class seat");
    }
}

export default EconomyClassSeat;