// margin-decorator.ts

import UIDecorator from "./ui-decorator";
import UIElement from "./ui-element";

class MarginDecorator extends UIDecorator {
    constructor(uiElement: UIElement) {
        super(uiElement);
    }

    public draw() {
        super.draw();
        console.log("Adding margin to the element");
    }
}

export default MarginDecorator;