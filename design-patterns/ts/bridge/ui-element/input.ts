// input.ts

import Color from "./color";
import UIElement from "./ui-element";


class Input extends UIElement {
    constructor(color: Color) {
        super(color);
    }
    public printElement(): void {
        this.color.setColor();

        console.log("Printing Input");
    }
}

export default Input;