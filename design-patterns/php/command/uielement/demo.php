<?php
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\Command\UiElement\ButtonUi;
use BigBoxCode\DesignPattern\Command\UiElement\InputUi;
use BigBoxCode\DesignPattern\Command\UiElement\TableUi;
use BigBoxCode\DesignPattern\Command\UiElement\UiControl;

$uiControl = new UiControl();

$inputUi = new InputUi();
$tableUi = new TableUi();
$buttonUi = new ButtonUi("Submit");

$uiControl->addElement($inputUi);
$uiControl->addElement($tableUi);
$uiControl->addElement($buttonUi);

$uiControl->removeElement($tableUi);

$uiControl->addElement(new ButtonUi("Cancel"));
$uiControl->addElement(new TableUi());
$uiControl->addElement(new InputUi());
$uiControl->addElement(new ButtonUi("Wrong button"));

// Undo commands
$uiControl->undo();
$uiControl->undo();