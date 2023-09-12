// order_context.go

package main

import "fmt"

type OrderContext struct {
	state IOrderState

	orderCheckState      IOrderState
	orderInProgressState IOrderState
	orderDeliverState    IOrderState
	orderReceiveState    IOrderState
}

func NewOrderContext() (orderContext *OrderContext) {
	orderContext = &OrderContext{}
	orderContext.orderCheckState = NewOrderCheckState(orderContext)
	orderContext.orderInProgressState = NewOrderInProgressState(orderContext)
	orderContext.orderDeliverState = NewOrderDeliverState(orderContext)
	orderContext.orderReceiveState = NewOrderReceiveState(orderContext)
	orderContext.state = orderContext.orderCheckState
	return
}

func (orderContext *OrderContext) GetOrderCheckState() IOrderState {
	return orderContext.orderCheckState
}

func (orderContext *OrderContext) GetOrderInProgressState() IOrderState {
	return orderContext.orderInProgressState
}

func (orderContext *OrderContext) GetOrderDeliverState() IOrderState {
	return orderContext.orderDeliverState
}

func (orderContext *OrderContext) GetOrderReceiveState() IOrderState {
	return orderContext.orderReceiveState
}

func (orderContext *OrderContext) GetState() IOrderState {
	return orderContext.state
}

func (orderContext *OrderContext) SetState(state IOrderState) {
	orderContext.state = state
}

func (orderContext *OrderContext) RunNextProcess() {
	if orderContext.state != nil {
		orderContext.state.Process()
	} else {
		fmt.Println("Order processing complete")
	}
}
