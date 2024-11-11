from abc import ABC, abstractmethod
from typing import List


# Menu Interface
class Menu(ABC):
    @abstractmethod
    def print(self) -> None:
        pass


# MenuItem Class
class MenuItem(Menu):
    def __init__(self, link: str, text: str):
        self.link = link
        self.text = text

    def print(self) -> None:
        print(f"[li][a link='{self.link}']{self.text}[/a][/li]")


# MenuParent Class
class MenuParent(Menu):
    def __init__(self):
        self.menu_items: List[Menu] = []

    def print(self) -> None:
        print("[ul]")
        for menu_item in self.menu_items:
            menu_item.print()
        print("[/ul]")

    def add_item(self, menu_item: Menu) -> None:
        self.menu_items.append(menu_item)

    def remove_item(self, menu_item: Menu) -> None:
        if menu_item in self.menu_items:
            self.menu_items.remove(menu_item)


# Demo
def main():
    # Define some menu items
    item1 = MenuItem("http://firstlink.com", "First Item")
    item2 = MenuItem("http://secondlink.com", "Second Item")
    item3 = MenuItem("http://thirdlink.com", "Third Item")

    # Define a group of items
    item_group1 = MenuParent()
    item_group1.add_item(MenuItem("http://group-item-1.com", "First group item"))
    item_group1.add_item(MenuItem("http://group-item-2.com", "Second group item"))
    item_group1.add_item(MenuItem("http://group-item-3.com", "Third group item"))
    item_group1.add_item(MenuItem("http://group-item-4.com", "Fourth group item"))

    item4 = MenuItem("http://item-4.com", "4th Item")

    # Add items to main menu
    main_menu = MenuParent()
    main_menu.add_item(item1)
    main_menu.add_item(item2)
    main_menu.add_item(item3)
    main_menu.add_item(item_group1)
    main_menu.add_item(item4)

    # Print the menu
    main_menu.print()


if __name__ == "__main__":
    main()
