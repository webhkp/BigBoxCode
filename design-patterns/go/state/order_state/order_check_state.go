// order_check_state.go

package main

import "fmt"

type OrderCheckState struct {
	*OrderState
}

func NewOrderCheckState(context *OrderContext) (orderCheckState *OrderCheckState) {
	orderCheckState = &OrderCheckState{}
	orderCheckState.OrderState = NewOrderState(orderCheckState, context)
	return
}

func (orderCheckState *OrderCheckState) Process() {
	fmt.Println("Checking the order validity and other information")
	orderCheckState.context.SetState(orderCheckState.context.GetOrderInProgressState())
}
