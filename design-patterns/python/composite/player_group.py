from abc import ABC, abstractmethod
from typing import List


# Player Interface
class Player(ABC):
    @abstractmethod
    def print_details(self) -> None:
        pass


# BasketballPlayer Class
class BasketballPlayer(Player):
    def __init__(self, name: str, age: int, points: int):
        self.name = name
        self.age = age
        self.points = points

    def print_details(self) -> None:
        print("Game: Basketball")
        print(f"Name: {self.name}")
        print(f"Age: {self.age}")
        print(f"Points: {self.points}")


# FootballPlayer Class
class FootballPlayer(Player):
    def __init__(self, name: str, age: int, goals: int):
        self.name = name
        self.age = age
        self.goals = goals

    def print_details(self) -> None:
        print("Game: Football")
        print(f"Name: {self.name}")
        print(f"Age: {self.age}")
        print(f"Goals: {self.goals}")


# CricketPlayer Class
class CricketPlayer(Player):
    def __init__(self, name: str, age: int, runs: int):
        self.name = name
        self.age = age
        self.runs = runs

    def print_details(self) -> None:
        print("Game: Cricket")
        print(f"Name: {self.name}")
        print(f"Age: {self.age}")
        print(f"Runs: {self.runs}")


# PlayerGroup Class
class PlayerGroup(Player):
    def __init__(self):
        self.player_list: List[Player] = []

    def print_details(self) -> None:
        for player in self.player_list:
            player.print_details()

    def add_element(self, player: Player) -> None:
        self.player_list.append(player)

    def remove_element(self, player: Player) -> None:
        if player in self.player_list:
            self.player_list.remove(player)


# Demo usage
def main():
    # Under 15 players
    under15_players = PlayerGroup()
    under15_players.add_element(FootballPlayer("FPlayer 15_1", 13, 23))
    under15_players.add_element(FootballPlayer("FPlayer 15_2", 14, 30))
    under15_players.add_element(BasketballPlayer("BPlayer 15_1", 12, 80))
    under15_players.add_element(BasketballPlayer("BPlayer 15_2", 14, 100))
    under15_players.add_element(CricketPlayer("CPlayer 15_1", 14, 467))

    # Under 19 players
    under19_players = PlayerGroup()
    under19_players.add_element(FootballPlayer("FPlayer 19_1", 18, 43))
    under19_players.add_element(BasketballPlayer("BPlayer 19_1", 17, 77))
    under19_players.add_element(CricketPlayer("CPlayer 19_1", 18, 654))
    under19_players.add_element(CricketPlayer("CPlayer 19_2", 16, 789))

    # National team players
    national_team_players = PlayerGroup()
    national_team_players.add_element(FootballPlayer("FPlayer N_1", 18, 43))
    national_team_players.add_element(BasketballPlayer("BPlayer N_1", 17, 77))
    national_team_players.add_element(CricketPlayer("CPlayer N_1", 18, 654))

    # Create a group with all teams
    all_teams = PlayerGroup()
    all_teams.add_element(under15_players)
    all_teams.add_element(under19_players)
    all_teams.add_element(national_team_players)

    # Print details of all players
    all_teams.print_details()


if __name__ == "__main__":
    main()