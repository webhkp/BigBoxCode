// order-context.ts

import OrderCheckState from "./order-check-state";
import OrderDeliverState from "./order-deliver-state";
import OrderInProgressState from "./order-in-progress-state";
import OrderReceiveState from "./order-receive-state";
import OrderState from "./order-state";

class OrderContext {
    private state: OrderState | null = null;
    private orderCheckState: OrderState;
    private orderInProgressState: OrderState;
    private orderDeliverState: OrderState;
    private orderReceiveState: OrderState;

    constructor() {
        this.orderCheckState = new OrderCheckState(this);
        this.orderInProgressState = new OrderInProgressState(this);
        this.orderDeliverState = new OrderDeliverState(this);
        this.orderReceiveState = new OrderReceiveState(this);

        // Set the placed state as default
        this.state = this.orderCheckState;
    }

    setState(state: OrderState | null): void {
        this.state = state;
    }

    getState(): OrderState | null {
        return this.state;
    }

    getOrderCheckState(): OrderState {
        return this.orderCheckState;
    }

    getOrderInProgressState(): OrderState {
        return this.orderInProgressState;
    }

    getOrderDeliverState(): OrderState {
        return this.orderDeliverState;
    }

    getOrderReceiveState(): OrderState {
        return this.orderReceiveState;
    }

    runNextProcess(): void {
        if (this.state != null) {
            this.state.process();
        } else {
            console.log("Order processing complete");
        }
    }
}

export default OrderContext;