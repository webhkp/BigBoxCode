<?php
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\Memento\General\Caretaker;
use BigBoxCode\DesignPattern\Memento\General\Originator;

$caretaker = new Caretaker();
$originator = new Originator();

$originator->setState("Time - 1 : " . time());
$caretaker->add($originator->setMemento());

// Add some delay if required for testing

$originator->setState("Time - 2 : " . time());
$caretaker->add($originator->setMemento());

// Add delay if required for testing

$originator->setState("Time - 3 : " . time());
$caretaker->add($originator->setMemento());

echo "Check state at index 1 (index starts at 0):\n";

$stateAtIndex1 = $caretaker->getByIndex(1);
echo $stateAtIndex1->getState() . "\n";


echo "Check last state:\n";

$lastState = $caretaker->getCurrent();
echo $lastState->getState() . "\n";


echo "Undoing last state\n";

$caretaker->undo();

echo "Check last state after undo:\n";

$lastStateAfterUndo = $caretaker->getCurrent();
echo $lastStateAfterUndo->getState();
