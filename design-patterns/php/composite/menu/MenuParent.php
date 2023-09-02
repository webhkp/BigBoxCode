<?php
// MenuParent.php

namespace BigBoxCode\DesignPattern\Composite\Menu;

class MenuParent implements Menu {
    private array $menuItems = [];

    public function print(): void {
        echo "[ul]\n";

        foreach ($this->menuItems as $menuItem) {
            $menuItem->print();
        }

        echo "[ul]\n";
    }

    public function addItem(Menu $menuItem): void {
        array_push($this->menuItems, $menuItem);
    }

    public function removeItem(Menu $menuItem): void {
        $itemIndex = array_search($menuItem, $this->menuItems);

        if ($itemIndex !== false) {
            unset($this->menuItems, $itemIndex);
        }
    }
}