<?php
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\Observer\Player\Commentator;
use BigBoxCode\DesignPattern\Observer\Player\Player;
use BigBoxCode\DesignPattern\Observer\Player\Referee;
use BigBoxCode\DesignPattern\Observer\Player\ScoreBoard;

// Referees
$referee1 = new Referee("REF #1");
$referee2 = new Referee("REF #2");

// Commentators
$commentator1 = new Commentator("John Doe");

// Score Boards
$scoreBoard = new ScoreBoard();

// Create players and attached observers
$playerA = new Player("Player A");

$playerA->attach($referee1);
$playerA->attach($referee2);
$playerA->attach($commentator1);
$playerA->attach($scoreBoard);

// Create another player and attach observers
$playerB = new Player("Player A");

$playerB->attach($referee1);
// Do not attach Referee #2 for demo purpose
// $playerA->attach($referee2);

$playerB->attach($commentator1);
$playerB->attach($scoreBoard);

// Change/set sccore for the players
echo "\nSet/Change 'Player A' score to - 1\n";
$playerA->setScore(1);

echo "\nSet/Change 'Player A' score to - 5\n";
$playerA->setScore(5);


echo "\nSet/Change 'Player B' score to - 3\n";
$playerB->setScore(3);

echo "\nSet/Change 'Player A' score to - 9\n";
$playerA->setScore(9);