// baseketball_player.go

package main

import "fmt"

type BasketBallPlayer struct {
	name  string
	age   int
	point int
}

func NewBasketBallPlayer(name string, age int, point int) (basketballPlayer *BasketBallPlayer) {
	basketballPlayer = &BasketBallPlayer{}
	basketballPlayer.name = name
	basketballPlayer.age = age
	basketballPlayer.point = point
	return
}

func (basketballPlayer *BasketBallPlayer) PrintDetails() {
	fmt.Println("Game: Basketball")
	fmt.Printf("Name: %v\n", basketballPlayer.name)
	fmt.Printf("Age: %v\n", basketballPlayer.age)
	fmt.Printf("Points: %v\n", basketballPlayer.point)
}
