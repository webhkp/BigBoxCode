<?php
// UiControl.php

namespace BigBoxCode\DesignPattern\Command\UiElement;


class UiControl {
    private array $commandList = [];

    public function addElement(UiCommand $command) {
        $command->print();

        array_push($this->commandList, $command);
    }

    public function removeElement(UiCommand $command) {
        $command->remove();

        foreach ($this->commandList as $key => $currentCommand) {
            if ($command === $currentCommand) {
                unset($this->commandList[$key]);
                break;
            }
        }
    }

    // Remove the last command
    public function undo() {
        $command = end($this->commandList);

        $this->removeElement($command);
    }
}