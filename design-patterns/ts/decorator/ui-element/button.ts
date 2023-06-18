// button.ts

import UIElement from "./ui-element";

class Button implements UIElement {
    draw(): void {
        console.log("Drawing Button");
    }
}

export default Button;