// main.go

package main

func main() {
	under15Players := NewPlayerGroup()
	under15Players.AddElement(NewFootballPlayer("FPlayer 15_1", 13, 23))
	under15Players.AddElement(NewFootballPlayer("FPlayer 15_2", 14, 30))
	under15Players.AddElement(NewBasketBallPlayer("BPlayer 15_1", 12, 80))
	under15Players.AddElement(NewBasketBallPlayer("BPlayer 15_2", 14, 100))
	under15Players.AddElement(NewCricketPlayer("CPlayer 15_1", 14, 467))

	under19Players := NewPlayerGroup()
	under19Players.AddElement(NewFootballPlayer("FPlayer 19_1", 18, 43))
	under19Players.AddElement(NewBasketBallPlayer("BPlayer 19_1", 17, 77))
	under19Players.AddElement(NewCricketPlayer("CPlayer 19_1", 18, 654))
	under19Players.AddElement(NewCricketPlayer("CPlayer 19_2", 16, 789))

	nationalTeamPlayers := NewPlayerGroup()
	nationalTeamPlayers.AddElement(NewFootballPlayer("FPlayer N_1", 18, 43))
	nationalTeamPlayers.AddElement(NewBasketBallPlayer("BPlayer N_1", 17, 77))
	nationalTeamPlayers.AddElement(NewCricketPlayer("CPlayer N_1", 18, 654))

	allTeams := NewPlayerGroup()
	allTeams.AddElement(under15Players)
	allTeams.AddElement(under19Players)
	allTeams.AddElement(nationalTeamPlayers)

	allTeams.PrintDetails()
}
