// business-class-seat.ts

import Seat from "./seat";

class BusinessClassSeat implements Seat {
    public selectSeat(): void {
        console.log("Select an Business class seat");
    }
}

export default BusinessClassSeat;