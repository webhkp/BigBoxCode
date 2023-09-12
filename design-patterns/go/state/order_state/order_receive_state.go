// order_receive_state.go

package main

import "fmt"

type OrderReceiveState struct {
	*OrderState
}

func NewOrderReceiveState(context *OrderContext) (orderReceiveState *OrderReceiveState) {
	orderReceiveState = &OrderReceiveState{}
	orderReceiveState.OrderState = NewOrderState(orderReceiveState, context)
	return
}

func (orderReceiveState *OrderReceiveState) Process() {
	fmt.Println("Order received")
	orderReceiveState.context.SetState(nil)
}
