// cricket_player.go

package main

import "fmt"

type CricketPlayer struct {
	name string
	age  int
	run  int
}

func NewCricketPlayer(name string, age int, run int) (cricketPlayer *CricketPlayer) {
	cricketPlayer = &CricketPlayer{}
	cricketPlayer.name = name
	cricketPlayer.age = age
	cricketPlayer.run = run
	return
}

func (cricketPlayer *CricketPlayer) PrintDetails() {
	fmt.Println("Game: Cricket")
	fmt.Printf("Name: %v\n", cricketPlayer.name)
	fmt.Printf("Age: %v\n", cricketPlayer.age)
	fmt.Printf("Runs: %v\n", cricketPlayer.run)
}