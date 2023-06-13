// football_player.go

package main

import "fmt"

type FootballPlayer struct {
	name string
	age  int
	goal int
}

func NewFootballPlayer(name string, age int, goal int) (footballPlayer *FootballPlayer) {
	footballPlayer = &FootballPlayer{}
	footballPlayer.name = name
	footballPlayer.age = age
	footballPlayer.goal = goal
	return
}

func (footballPlayer *FootballPlayer) PrintDetails() {
	fmt.Println("Game: Football")
	fmt.Printf("Name: %v\n", footballPlayer.name)
	fmt.Printf("Age: %v\n", footballPlayer.age)
	fmt.Printf("Goals: %v\n", footballPlayer.goal)
}
