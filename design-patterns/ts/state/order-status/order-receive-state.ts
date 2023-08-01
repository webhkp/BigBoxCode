// order-receive-state.ts

import OrderContext from "./order-context";
import OrderState from "./order-state";


class OrderReceiveState extends OrderState {
    constructor(context: OrderContext) {
        super(context);
    }

    process(): void {
        // Write code to process the order
        console.log("Order received");

        this.context.setState(null);
    }
}

export default OrderReceiveState;