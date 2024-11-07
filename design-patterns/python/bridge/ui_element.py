from abc import ABC, abstractmethod


# Color interface
class Color(ABC):
    @abstractmethod
    def set_color(self) -> None:
        pass


# Red color class
class Red(Color):
    def set_color(self) -> None:
        print("Setting proper color for Red color schema")


# Green color class
class Green(Color):
    def set_color(self) -> None:
        print("Setting proper color for Green color schema")


# Blue color class
class Blue(Color):
    def set_color(self) -> None:
        print("Setting proper color for Blue color schema")


# UIElement abstract class
class UIElement(ABC):
    def __init__(self, color: Color) -> None:
        self.color = color

    @abstractmethod
    def print_element(self) -> None:
        pass


# Button class
class Button(UIElement):
    def print_element(self) -> None:
        self.color.set_color()
        print("Printing Button")


# Input class
class Input(UIElement):
    def print_element(self) -> None:
        self.color.set_color()
        print("Printing Input")


# Table class
class Table(UIElement):
    def print_element(self) -> None:
        self.color.set_color()
        print("Printing Table")


# Demo Usage
def main():
    table = Table(Red())
    table.print_element()

    input_element = Input(Green())
    input_element.print_element()

    button = Button(Blue())
    button.print_element()

    button2 = Button(Red())
    button2.print_element()


if __name__ == "__main__":
    main()
