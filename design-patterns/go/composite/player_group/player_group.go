// player_group.go

package main

type PlayerGroup struct {
	playerList []Player
}

func NewPlayerGroup() (playerGroup *PlayerGroup) {
	playerGroup = &PlayerGroup{}
	return
}

func (playerGroup *PlayerGroup) AddElement(player Player) {
	playerGroup.playerList = append(playerGroup.playerList, player)
}

func (playerGroup *PlayerGroup) RemoveElement(player Player) {
	newPlayerList := []Player{}

	for _, currentPlayer := range playerGroup.playerList {
		if currentPlayer == player {
			continue
		}

		newPlayerList = append(newPlayerList, currentPlayer)
	}

	playerGroup.playerList = newPlayerList
}

func (playerGroup *PlayerGroup) PrintDetails() {
	for _, player := range playerGroup.playerList {
		player.PrintDetails()
	}
}