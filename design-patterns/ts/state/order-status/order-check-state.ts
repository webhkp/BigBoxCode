// order-check-state.ts

import OrderContext from "./order-context";
import OrderState from "./order-state";

class OrderCheckState extends OrderState {
    constructor(context: OrderContext) {
        super(context);
    }

    process(): void {
        // Write code to process the order
        console.log("Checking the order validity and other information");

        this.context.setState(this.context.getOrderInProgressState());
    }
}

export default OrderCheckState;