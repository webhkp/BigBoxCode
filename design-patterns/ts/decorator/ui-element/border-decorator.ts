// border-decorator.ts

import UIDecorator from "./ui-decorator";
import UIElement from "./ui-element";

class BorderDecorator extends UIDecorator {
    constructor(uiElement: UIElement) {
        super(uiElement);
    }

    draw(): void {
        super.draw();
        console.log("Adding Border to the element");
    }
}

export default BorderDecorator;