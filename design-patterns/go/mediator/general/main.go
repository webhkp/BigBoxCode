// main.go

package main

func main() {
	mediator := NewMediator()
	colleague1 := NewColleague1(mediator)
	colleague2 := NewColleague2(mediator)
	colleague3 := NewColleague3(mediator)

	colleague1.SendMessage(colleague2, "message from colleague1")
	colleague1.SendMessage(colleague3, "message from colleague1")

	colleague2.SendMessage(colleague3, "message from colleague2")
	colleague3.SendMessage(colleague1, "message from colleague3")
}
