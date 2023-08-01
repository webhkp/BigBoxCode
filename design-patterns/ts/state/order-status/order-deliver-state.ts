// order-deliver-state.ts

import OrderContext from "./order-context";
import OrderState from "./order-state";

class OrderDeliverState extends OrderState {
    constructor(context: OrderContext) {
        super(context);
    }

    process(): void {
        // Write code to process the order
        console.log("Delivering the order");

        this.context.setState(this.context.getOrderReceiveState());
    }
}

export default OrderDeliverState;