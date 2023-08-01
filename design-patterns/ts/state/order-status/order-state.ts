// order-state.ts

import OrderContext from "./order-context";

abstract class OrderState {

    protected context: OrderContext;

    constructor(context: OrderContext) {
        this.context = context;

        this.context.setState(this);
    }

    abstract process(): void;
}

export default OrderState;