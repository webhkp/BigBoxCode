// ui-element.ts

import Color from "./color";

abstract class UIElement {
    protected color: Color;

    constructor(color: Color) {
        this.color = color;
    }

    abstract printElement(): void;
}

export default UIElement;