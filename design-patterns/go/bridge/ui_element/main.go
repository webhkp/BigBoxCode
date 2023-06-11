// main.go

package main

func main() {
	table := NewTable(NewRed())
	table.PrintElement()
	
	input := NewInput(NewGreen())
	input.PrintElement()
	
	button := NewButton(NewBlue())
	button.PrintElement()
	
	button2 := NewButton(NewRed())
	button2.PrintElement()
}