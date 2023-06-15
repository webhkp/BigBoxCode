// button.ts

import Color from "./color";
import UIElement from "./ui-element";

class Button extends UIElement {
    constructor(color: Color) {
        super(color);
    }

    public printElement(): void {
        this.color.setColor();

        console.log("Printing Button");
    }
}

export default Button;