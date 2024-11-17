from abc import ABC, abstractmethod


# Base Component
class UIElement(ABC):
    @abstractmethod
    def draw(self) -> None:
        pass


# Concrete Components
class Button(UIElement):
    def draw(self) -> None:
        print("Drawing Button")


class InputBox(UIElement):
    def draw(self) -> None:
        print("Drawing Input Box")


class Table(UIElement):
    def draw(self) -> None:
        print("Drawing Table")


# Base Decorator
class UIDecorator(UIElement):
    def __init__(self, ui_element: UIElement):
        self._ui_element = ui_element

    def draw(self) -> None:
        self._ui_element.draw()


# Concrete Decorators
class BorderDecorator(UIDecorator):
    def draw(self) -> None:
        super().draw()
        self.add_border()

    def add_border(self) -> None:
        print("Adding Border to the element")


class BackgroundDecorator(UIDecorator):
    def draw(self) -> None:
        super().draw()
        self.add_background()

    def add_background(self) -> None:
        print("Adding Background to the element")


class MarginDecorator(UIDecorator):
    def draw(self) -> None:
        super().draw()
        self.add_margin()

    def add_margin(self) -> None:
        print("Adding margin to the element")


# Demo
def main():
    # Table with Border
    table_with_border = BorderDecorator(Table())
    table_with_border.draw()

    # Input Box with Border and Background
    input_with_border_and_background = BackgroundDecorator(BorderDecorator(InputBox()))
    input_with_border_and_background.draw()

    # Button with all Decorators
    button_with_all_decorators = MarginDecorator(
        BackgroundDecorator(BorderDecorator(Button()))
    )
    button_with_all_decorators.draw()


if __name__ == "__main__":
    main()
