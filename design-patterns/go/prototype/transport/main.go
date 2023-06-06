// main.go

package main

import "fmt"

func main() {
	car1 := NewCar()
	car1.Make = 2014
	car1.Model = "ABCD"
	car1.Color = "Red"

	fmt.Println(car1.ToString())

	carClone := car1.Clone().(*Car)
	carClone.Model = "Some Different Model"
	carClone.Color = "White"

	fmt.Println(carClone.ToString())
}
