// main.go

package main

func main() {
	order := NewOrderContext()

	order.RunNextProcess()
	order.RunNextProcess()
	order.RunNextProcess()
	order.RunNextProcess()

	// Trying to process after all steps are complete
	order.RunNextProcess()
}
