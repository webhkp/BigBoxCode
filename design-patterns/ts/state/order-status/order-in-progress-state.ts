// order-in-progress-state.ts

import OrderContext from "./order-context";
import OrderState from "./order-state";

class OrderInProgressState extends OrderState {
    constructor(context: OrderContext) {
        super(context);
    }

    process(): void {
        // Write code to process the order
        console.log("Processing the order");

        this.context.setState(this.context.getOrderDeliverState());
    }
}

export default OrderInProgressState;