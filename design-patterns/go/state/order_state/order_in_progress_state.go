// order_in_progress_state.go

package main

import "fmt"

type OrderInProgressState struct {
	*OrderState
}

func NewOrderInProgressState(context *OrderContext) (orderInProgressState *OrderInProgressState) {
	orderInProgressState = &OrderInProgressState{}
	orderInProgressState.OrderState = NewOrderState(orderInProgressState, context)
	return
}

func (orderInProgressState *OrderInProgressState) Process() {
	fmt.Println("Processing the order")
	orderInProgressState.context.SetState(orderInProgressState.context.GetOrderDeliverState())
}
