// order_state.go

package main

type IOrderState interface {
	Process()
}

type OrderState struct {
	context *OrderContext
	IOrderState
}

func NewOrderState(iOrderState IOrderState, context *OrderContext) (orderState *OrderState) {
	orderState = &OrderState{}
	orderState.IOrderState = iOrderState
	orderState.context = context

	context.SetState(orderState)

	return
}
