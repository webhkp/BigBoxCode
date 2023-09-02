<?php 
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\Composite\PlayerGroup\BasketballPlayer;
use BigBoxCode\DesignPattern\Composite\PlayerGroup\CricketPlayer;
use BigBoxCode\DesignPattern\Composite\PlayerGroup\FootballPlayer;
use BigBoxCode\DesignPattern\Composite\PlayerGroup\PlayerGroup;

// Under 15 players
$under15Players = new PlayerGroup();

$under15Players->addElement(new FootballPlayer("FPlayer 15_1", 13, 23));
$under15Players->addElement(new FootballPlayer("FPlayer 15_2", 14, 30));

$under15Players->addElement(new BasketballPlayer("BPlayer 15_1", 12, 80));
$under15Players->addElement(new BasketballPlayer("BPlayer 15_2", 14, 100));

$under15Players->addElement(new CricketPlayer("CPlayer 15_1", 14, 467));


// Under 19 Players
$under19Players = new PlayerGroup();

$under19Players->addElement(new FootballPlayer("FPlayer 19_1", 18, 43));

$under19Players->addElement(new BasketballPlayer("BPlayer 19_1", 17, 77));

$under19Players->addElement(new CricketPlayer("CPlayer 19_1", 18, 654));
$under19Players->addElement(new CricketPlayer("CPlayer 19_2", 16, 789));


// National team players
$nationalTeamPlayers = new PlayerGroup();
$nationalTeamPlayers->addElement(new FootballPlayer("FPlayer N_1", 18, 43));
$nationalTeamPlayers->addElement(new BasketballPlayer("BPlayer N_1", 17, 77));
$nationalTeamPlayers->addElement(new CricketPlayer("CPlayer N_1", 18, 654));


// Create a group with all teams
$allTeams = new PlayerGroup();
$allTeams->addElement($under15Players);
$allTeams->addElement($under19Players);
$allTeams->addElement($nationalTeamPlayers);

// Print details of all players
// from each game and group
$allTeams->printDetails();