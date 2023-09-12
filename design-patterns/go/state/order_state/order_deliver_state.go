// order_deliver_state.go

package main

import "fmt"

type OrderDeliverState struct {
	*OrderState
}

func NewOrderDeliverState(context *OrderContext) (orderDeliverState *OrderDeliverState) {
	orderDeliverState = &OrderDeliverState{}
	orderDeliverState.OrderState = NewOrderState(orderDeliverState, context)
	return
}
func (orderDeliverState *OrderDeliverState) Process() {
	fmt.Println("Delivering the order")
	orderDeliverState.context.SetState(orderDeliverState.context.GetOrderReceiveState())
}
