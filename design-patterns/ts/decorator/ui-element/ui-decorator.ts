// ui-decorator.ts

import UIElement from "./ui-element";

abstract class UIDecorator implements UIElement {
    protected readonly uiElement: UIElement;

    protected constructor(uiElement: UIElement) {
        this.uiElement = uiElement;
    }

    draw(): void {
        this.uiElement.draw();
    }
}

export default UIDecorator;